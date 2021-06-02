const fs = require('fs')
const ftp = new(require('basic-ftp')).Client()
const sn = global.chalk.magenta('[CMD-Handler] -> ')
const cmdAlias = require('./cmdalias').list
const messages = require('./messages').list
const cmds = require('./cmds')
let hasStarterkit = []

async function loadKits() {
    try {
        await ftpCon()
        await ftp.downloadTo('./app/storage/starterkits.json', process.env.RM_CMD_FTP_DIR + 'starterkits.json')
        hasStarterkit = JSON.parse(fs.readFileSync('./app/storage/starterkits.json'))
    } catch (error) {
        throw new Error(error)
    }

    ftp.close()
}

async function receivesStarterkit(steamID) {
    try {
        await loadKits()
        hasStarterkit.push(steamID)
        fs.writeFileSync('./app/storage/starterkits.json', JSON.stringify(hasStarterkit))
        await ftpCon()
        await ftp.uploadFrom('./app/storage/starterkits.json', process.env.RM_CMD_FTP_DIR + 'starterkits.json')
    } catch (error) {
        throw new Error(error)
    }
}

async function ftpCon() {
    try {
        await ftp.access({
            host: process.env.RM_CMD_FTP_HOST,
            port: process.env.RM_CMD_FTP_PORT,
            user: process.env.RM_CMD_FTP_USER,
            password: process.env.RM_CMD_FTP_PASSWORD,
            secure: true
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.start = async function start() {
    let i = 0
    await loadKits()
    this.announce()

    do {
        await global.sleep.timer(0.01)
        if (Object.keys(global.commands).length < 1) continue

        let newCmds = {}
        for (const e in global.commands) {
            let cmd = global.commands[e]
            let cmdStart = cmd.message.split(' ')[0]

            if (cmdAlias[cmdStart.toLowerCase()]) {
                newCmds = {
                    ...newCmds,
                    ...await cmds[cmdAlias[cmdStart.toLowerCase()]](e, cmd)
                }

            } else if (cmdStart.toLowerCase() == '!starterkit') {
                await loadKits()
                if (cmd.type.toLowerCase() != 'global') continue
                if (!hasStarterkit.includes(cmd.steamID)) {
                    newCmds = {
                        ...newCmds,
                        ...await cmds['starterkitlegal'](e, cmd)
                    }
                } else {
                    newCmds = {
                        ...newCmds,
                        ...await cmds['starterkitillegal'](e, cmd)
                    }
                }

            } else if (cmdStart.toLowerCase() == '!ready') {
                await loadKits()
                if (!hasStarterkit.includes(cmd.steamID)) {
                    await receivesStarterkit(cmd.steamID)
                    newCmds = {
                        ...newCmds,
                        ...await cmds['starterkitready'](e, cmd)
                    }
                } else {
                    newCmds = {
                        ...newCmds,
                        ...await cmds['starterkitillegal'](e, cmd)
                    }
                }

            } else if (cmdStart.toLowerCase() == 'welcome_new') {
                newCmds = {
                    ...newCmds,
                    ...await cmds['welcome'](cmd)
                }
                
            }

            delete global.commands[e]
        }

        i++
        await this.sendCommands(i, newCmds)
    } while (true)

}

exports.sendCommands = async function sendCommands(key, cmdObj) {

    console.log(sn + 'Sending Commands per FTP')

    fs.writeFileSync('./app/storage/tmpCmd/' + key + '_cmds.json', JSON.stringify(cmdObj))

    try {
        await ftpCon()
        await ftp.uploadFrom('./app/storage/tmpCmd/' + key + '_cmds.json', process.env.RM_CMD_FTP_DIR + 'cmds/' + key + '_cmds.json')
    } catch (error) {
        throw new Error(error)
    }

    ftp.close()

}

exports.announce = async function announce() {

    do {

        await global.sleep.timer(5)

        let now = new Date()
        let time = now.getHours() + ':' + now.getMinutes()

        if (messages[time]) {
            if (messages[time].done) continue
            let key = 'announce_' + now.getHours() + '_' + now.getMinutes()
            let tmpObj = {}
            tmpObj[key] = {
                type: 'global',
                commands: [
                    '#SetFakeName [SF-BOT][RESTART]',
                    messages[time].text,
                    '#ClearFakeName'
                ]
            }
            messages[time].done = true
            await this.sendCommands(key, tmpObj)

        } else {
            for (const e in messages) {
                messages[e].done = false
            }
        }

    } while (true)

}