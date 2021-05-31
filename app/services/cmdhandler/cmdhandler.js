const fs = require('fs')
const ftp = new(require('basic-ftp')).Client()
const sn = global.chalk.magenta('[CMD-Handler] -> ')
const cmdAlias = require('./cmdalias').list
const cmds = require('./cmds')

exports.start = async function start() {
    let i = 0
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
            }

            delete global.commands[e]
        }

        i++
        await this.sendCommands(i, newCmds)
    } while (true)

}

exports.sendCommands = async function sendCommands(key, cmdObj) {

    console.log(cmdObj)
    console.log(sn + 'Sending Commands per FTP')

    fs.writeFileSync('./app/storage/tmpCmd/' + key + '_cmds.json', JSON.stringify(cmdObj))

    try {
        await ftp.access({
            host: process.env.RM_CMD_FTP_HOST,
            port: process.env.RM_CMD_FTP_PORT,
            user: process.env.RM_CMD_FTP_USER,
            password: process.env.RM_CMD_FTP_PASSWORD,
            secure: true
        })

        await ftp.uploadFrom('./app/storage/tmpCmd/' + key + '_cmds.json', process.env.RM_CMD_FTP_DIR + key + '_cmds.json')

    } catch (error) {
        throw new Error(error)
    }

    ftp.close()

}

exports.announce = async function announce() {

    let announced = {
        '17:55': {
            text: '#Announce Restart in 5 Minutes!',
            done: false
        },
        '17:59': {
            text: '#Announce Restart in 1 Minute!',
            done: false
        },
        '23:55': {
            text: '#Announce Restart in 5 Minutes!',
            done: false
        },
        '23:59': {
            text: '#Announce Restart in 1 Minute!',
            done: false
        }
    }

    do {

        await global.sleep.timer(5)

        let now = new Date()
        let time = now.getHours() + ':' + now.getMinutes()

        if (announced[time]) {
            if (announced[time].done) continue
            let key = 'announce_' + now.getHours() + '_' + now.getMinutes()
            let tmpObj = {}
            tmpObj[key] = {
                type: 'global',
                commands: [
                    '#SetFakeName [SF-BOT][RESTART]',
                    announced[time].text,
                    '#ClearFakeName'
                ]
            }
            announced[time].done = true
            await this.sendCommands(key, tmpObj)

        } else {
            for (const e in announced) {
                announced[e].done = false
            }
        }

    } while (true)

}