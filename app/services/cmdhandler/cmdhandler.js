const fs = require('fs')
const ftp = new(require('basic-ftp')).Client()
const sn = global.chalk.magenta('[CMD-Handler] -> ')
const messages = require('./messages').list
const cmdsPublic = require('./cmd/public')
const cmdsInternal = require('./cmd/internal')
const scum = require('./scum')
let hasStarterkit = []
let checkCounter = 0

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

async function loadStatus(file) {
    try {
        await ftpCon()
        await ftp.downloadTo('./app/storage/' + file, process.env.RM_CMD_FTP_DIR + file)
        ftp.close()
        return JSON.parse(fs.readFileSync('./app/storage/' + file))
    } catch (error) {
        throw new Error(error)
    }

}

async function receivesStarterkit(steamID, name) {
    try {
        hasStarterkit = await loadStatus('starterkits.json')
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
    hasStarterkit = await loadStatus('starterkits.json')
    if (cmd.type.toLowerCase() != 'global') return null
    if (!hasStarterkit[cmd.steamID]) return await cmdsInternal['sk_legal'](cmd)
    else return await cmdsInternal['sk_illegal'](cmd)
}

async function tReady(cmd) {
    hasStarterkit = await loadStatus('starterkits.json')
    if (!hasStarterkit[cmd.steamID]) {
        await receivesStarterkit(cmd.steamID, cmd.user)
        return await cmdsInternal['sk_ready'](cmd)
    } else return await cmdsInternal['sk_illegal'](cmd)
}

async function sendCommands(cmdObj) {
    try {
        for (const e in cmdObj) {
            let cmdArr = []
            if (!cmdObj[e] || !cmdObj[e].commands || cmdObj[e].commands.length < 1) continue
            for (const cmd of cmdObj[e].commands) cmdArr.push(cmd)
            if (!await scum.send(cmdArr)) {
                if (!await scum.isReady()) await scum.start()
            } else checkCounter = 0
        }
        global.newCmds = false
    } catch (error) {
        throw new Error(error)
    }
}

async function checkStatus() {
    do {
        await global.sleep.timer(1)
        checkCounter++
        if (checkCounter < 120) continue
        if (global.newCmds) continue
        if (global.updates) continue
        if (!global.gameReady) continue
        if (global.updatingFTP) continue
        if (!await scum.isReady()) await scum.start()
        checkCounter = 0
    } while (true)
}

async function makeBusiness() {
    let bTimes = [15, 45]
    do {
        await global.sleep.timer(10)
        if (global.newCmds) continue
        if (global.updates) continue
        if (!global.gameReady) continue
        if (global.updatingFTP) continue

        now = new Date()
        if (!bTimes.includes(now.getMinutes())) continue
        doExecute('act_business.py', false, true)
        await global.sleep.timer(60)

    } while (true)
}

async function makeBreak() {
    let bTimes = [10, 20, 30, 40, 50]
    do {
        await global.sleep.timer(10)
        if (global.newCmds) continue
        if (global.updates) continue
        if (!global.gameReady) continue
        if (global.updatingFTP) continue

        now = new Date()
        if (!bTimes.includes(now.getMinutes())) continue
        doExecute('act_break.py', false, true)
        await global.sleep.timer(60)

    } while (true)
}

async function doExecute(scriptName, clearCmds = false, force = false) {
    global.gameReady = false
    if (!await scum.execScript(scriptName, clearCmds, force)) {
        if (!await scum.isReady()) await scum.start()
    } else checkCounter = 0
}

exports.start = async function start() {
    if (!await scum.isReady()) await scum.start()

    makeBreak()
    makeBusiness()
    checkStatus()
    announce()
    let i = 0

    do {
        await global.sleep.timer(0.01)
        if (global.updates) continue
        if (global.updatingFTP) continue
        if (!global.gameReady) continue
        if (Object.keys(global.commands).length < 1) continue

        global.newCmds = true
        let newCmds = {}
        for (const e in global.commands) {
            let cmd = {
                ...global.commands[e]
            }
            delete global.commands[e]
            let cmdStart = cmd.message.split(' ')[0].toLowerCase()

            if (cmdsPublic.list[cmdStart]) newCmds[e] = await cmdsPublic[cmdsPublic.list[cmdStart]](cmd)
            else if (cmdStart == '!starterkit') newCmds[e] = await tStarterkit(cmd)
            else if (cmdStart == '!ready') newCmds[e] = await tReady(cmd)
            else if (cmdStart == '!exec') newCmds['exec_' + cmd.steamID] = await cmdsInternal['exec'](cmd)
            else if (cmdStart == '!spawn') newCmds['spawn_' + cmd.steamID] = await cmdsInternal['spawn'](cmd)
            else if (cmdStart == 'welcome_new') newCmds['welcome_' + cmd.joined.getTime] = await cmdsInternal['welcome_new'](cmd)
            else if (cmdStart == 'console_msg') newCmds['console_' + e] = await cmdsInternal['console_msg'](cmd)
            else if (cmdStart == 'kill_feed') newCmds[e] = await cmdsInternal['kill_feed'](cmd)
            else if (cmdStart == 'auth_log') newCmds[e] = await cmdsInternal['auth_log'](cmd)
            else if (cmdStart == 'mine_armed') newCmds[e] = await cmdsInternal['mine_armed'](cmd)
            else {
                if (cmdStart == '!break') await doExecute('act_break.py')
                else if (cmdStart == '!business') await doExecute('act_business.py')
                else if (cmdStart == '!firework') await doExecute('act_firework.py')
                else if (cmdStart == '!idle') await doExecute('act_idle.py')
                else if (cmdStart == '!lightup') await doExecute('act_light.py', true)
                else if (cmdStart == '!repair') await doExecute('act_repair.py')
            }

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
            messages[time].done = true
            await sendCommands(tmpObj)

        } else {
            for (const e in messages) {
                messages[e].done = false
            }
        }

    } while (true)
}