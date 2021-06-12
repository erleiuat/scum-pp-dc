const fs = require('fs')
const ftp = new(require('basic-ftp')).Client()
const sn = global.chalk.magenta('[CMD-Handler] -> ')
const messages = require('./messages').list
const cmdsPublic = require('./cmd/public')
const cmdsInternal = require('./cmd/internal')
const scum = require('./scum')
let hasStarterkit = []

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

async function receivesStarterkit(steamID, name) {
    try {
        await loadKits()
        hasStarterkit[steamID] = {
            name: name,
            stamp: new Date().getTime()
        }
        fs.writeFileSync('./app/storage/starterkits.json', JSON.stringify(hasStarterkit))
        await ftpCon()
        await ftp.uploadFrom('./app/storage/starterkits.json', process.env.RM_CMD_FTP_DIR + 'starterkits.json')
    } catch (error) {
        throw new Error(error)
    }
}

async function tStarterkit(cmd) {
    await loadKits()
    if (cmd.type.toLowerCase() != 'global') return null
    if (!hasStarterkit[cmd.steamID]) return await cmdsInternal['sk_legal'](cmd)
    else return await cmdsInternal['sk_illegal'](cmd)
}

async function tReady(cmd) {
    await loadKits()
    if (!hasStarterkit[cmd.steamID]) {
        await receivesStarterkit(cmd.steamID, cmd.user)
        return await cmdsInternal['sk_ready'](cmd)
    } else return await cmdsInternal['sk_illegal'](cmd)
}

async function sendCommands(cmdObj) {
    try {
        global.newCmds = true
        for (const e in cmdObj) {
            let cmdStr = ''
            for (const cmd of cmdObj[e].commands) cmdStr += ' "' + (cmd.replace(/"/gmi, "'")) + '" '
            await scum.send(cmdStr)
        }
        global.newCmds = false
    } catch (error) {
        throw new Error(error)
    }
}

async function checkStatus() {
    do {
        await global.sleep.timer(60)
        if (global.newCmds) continue
        if (global.updates) continue
        if (!await scum.isReady()) await scum.start()
    } while (true)
}

exports.start = async function start() {
    if (!await scum.isReady()) await scum.start()

    checkStatus()
    announce()
    let i = 0

    do {
        await global.sleep.timer(0.01)
        if (global.updates) continue
        if (global.updatingFTP) continue
        if (Object.keys(global.commands).length < 1) continue

        let newCmds = {}
        for (const e in global.commands) {
            let cmd = global.commands[e]
            let cmdStart = cmd.message.split(' ')[0].toLowerCase()

            if (cmdsPublic.list[cmdStart]) newCmds[e] = await cmdsPublic[cmdsPublic.list[cmdStart]](cmd)
            else if (cmdStart == '!starterkit') newCmds[e] = await tStarterkit(cmd)
            else if (cmdStart == '!ready') newCmds[e] = await tReady(cmd)
            else if (cmdStart == 'welcome_new') newCmds['welcome_' + cmd.joined.getTime] = await cmdsInternal['welcome_new'](cmd)
            else if (cmdStart == 'console_msg') newCmds['console_' + e] = await cmdsInternal['console_msg'](cmd)
            else if (cmdStart == 'kill_feed') newCmds[e] = await cmdsInternal['kill_feed'](cmd)

            delete global.commands[e]
        }

        i++
        await sendCommands(newCmds)
    } while (true)

}

async function announce() {
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
            messages[time].done= true
            await sendCommands(tmpObj)

        } else {
            for (const e in messages) {
                messages[e].done = false
            }
        }

        if (now.getMinutes() % 10 == 0) {
            let key = 'announce_' + now.getHours() + '_' + now.getMinutes()
            let tmpObj = {}
            tmpObj[key] = {
                type: 'global',
                commands: [
                    '#SetFakeName [SF-BOT][WIPE]',
                    '#Announce Server-Wipe coming soon. Check the latest news on Discord for more information.',
                    '#ClearFakeName'
                ]
            }
            await sendCommands(tmpObj)
            await global.sleep.timer(65)
        }

    } while (true)
}