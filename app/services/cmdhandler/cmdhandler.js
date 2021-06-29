const fs = require('fs')
const ftp = new(require('basic-ftp')).Client()
const sn = global.chalk.magenta('[CMD-Handler] -> ')
const messages = require('./messages').list
const cmdsPublic = require('./cmd/public')
const cmdsInternal = require('./cmd/internal')
const action = require('./actions')
const bot = require('../../gamebot/gamebot')
let hasStarterkit = []
let checkCounter = 0


async function execute(cmd) {
    if (!cmd || !cmd.commands || !cmd.commands.length) return
    let resp = {error: false}
    for (const command of cmd.commands) {
        for (const cmdType in command) {

            if (cmdType == 'messages') {
                resp = {...resp, ...await bot.messages(command[cmdType])}
            } else if (cmdType == 'actions') {
                resp = {...resp, ...await bot.actions(command[cmdType])}
            } else if (cmdType == 'function') {
                (command[cmdType])()
            } else {
                continue
            }

            if (resp.error) {
                if (resp.errorMessage) console.log(sn + 'Error: ' + resp.errorMessage)
                else console.log(sn + 'Error while executing (no message)')
            }

        }
    }

    return resp
}


exports.start = async function start() {

    let botState = await bot.start()
    if (botState.error || botState.state != 'running') global.gameReady = false
    else global.gameReady = true

    await execute(await action.doAct('startup'))
    global.commands = {}

    getMap()
    cmdHandler()
    makeBusiness()
    checkStatus()
    makeBreak()
    announce()

}

async function cmdHandler() {
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
            else if (cmdStart == 'welcome_new') newCmds['welcome_' + e] = await cmdsInternal['welcome_new'](cmd)
            else if (cmdStart == 'console_msg') newCmds['console_' + e] = await cmdsInternal['console_msg'](cmd)
            else if (cmdStart == 'kill_feed') newCmds[e] = await cmdsInternal['kill_feed'](cmd)
            else if (cmdStart == 'auth_log') newCmds[e] = await cmdsInternal['auth_log'](cmd)
            else if (cmdStart == 'mine_armed') newCmds[e] = await cmdsInternal['mine_armed'](cmd)
            else {
                if (cmdStart == '!break') await execute(await action.doAct('eat'))
                else if (cmdStart == '!shit') await execute(await action.doAct('shit'))
                else if (cmdStart == '!piss') await execute(await action.doAct('piss'))
                else if (cmdStart == '!business') await execute(await action.doAct('business'))
                else if (cmdStart == '!dress') await execute(await action.doAct('dress'))
                else if (cmdStart == '!idle') await execute(await action.doAct('idle'))
                else if (cmdStart == '!lightup') await execute(await action.doAct('light'))
                else if (cmdStart == '!repair') await execute(await action.doAct('repair'))
                else if (cmdStart == '!startup') await execute(await action.doAct('startup'))
                else {
                    console.log(sn + 'Unknown command: ' + cmdStart)
                }
            }

        }

        i++

        for (const cmd in newCmds) {
            await execute(newCmds[cmd])
        }

    } while (true)
}

async function getMap() {
    do {
        await global.sleep.timer(60)
        if (global.newCmds) continue
        if (global.updates) continue
        if (!global.gameReady) continue
        if (global.updatingFTP) continue
        
        console.log(sn + 'Getting current player positions')
        let imgInfo = await execute({commands:[{actions: {mapshot: true}}]})
        if (!imgInfo) {
            console.log(sn + 'No image info received')
            continue
        }

        try {
            imgInfo = imgInfo.data

            let d = new Date()
            global.newEntries.maps[imgInfo.fileName] = {
                ...imgInfo,
                time: {
                    date: global.nZero.form(d.getDate()) + '.' + global.nZero.form((d.getMonth() + 1)) + '.' + d.getFullYear(),
                    time: global.nZero.form(d.getHours()) + ':' + global.nZero.form(d.getMinutes()) + ':' + global.nZero.form(d.getSeconds())
                }
            }
            console.log(sn + 'Added map for processing')
        } catch (error) {
            console.log(sn + 'Error: ' + error)
        }

    } while (true)
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
    if (cmd.type.toLowerCase() != 'global') return null
    hasStarterkit = await loadStatus('starterkits.json')
    if (!hasStarterkit[cmd.steamID]) return await cmdsInternal['sk_legal'](cmd)
    else return await cmdsInternal['sk_illegal'](cmd)
}

async function tReady(cmd) {
    hasStarterkit = await loadStatus('starterkits.json')
    if (!hasStarterkit[cmd.steamID]) {
        return await cmdsInternal['sk_ready'](cmd, () => receivesStarterkit(cmd.steamID, cmd.user))
    } else return await cmdsInternal['sk_illegal'](cmd)
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
        execute({
            commands: [{
                actions: {
                    awake: true
                }
            }]
        })
        checkCounter = 0
    } while (true)
}

async function makeBusiness() {
    let bTimes = [30]
    do {
        await global.sleep.timer(10)
        if (global.newCmds) continue
        if (global.updates) continue
        if (!global.gameReady) continue
        if (global.updatingFTP) continue

        now = new Date()
        if (!bTimes.includes(now.getMinutes())) continue
        await execute(await action.doAct('business'))
        await global.sleep.timer(60)

    } while (true)
}

async function makeBreak() {
    let bTimes = [15, 45]
    do {
        await global.sleep.timer(10)
        if (global.newCmds) continue
        if (global.updates) continue
        if (!global.gameReady) continue
        if (global.updatingFTP) continue

        now = new Date()
        if (!bTimes.includes(now.getMinutes())) continue
        await execute(await action.doAct('eat'))
        await global.sleep.timer(60)

    } while (true)
}


async function announce() {
    do {
        await global.sleep.timer(10)

        let now = new Date()
        let time = now.getHours() + ':' + now.getMinutes()
        if (messages[time]) {
            if (messages[time].done) continue
            await execute({
                commands: [{
                    messages: [{
                        scope: 'global',
                        message: messages[time].text
                    }]
                }]
            })
            messages[time].done = true
        } else {
            for (const e in messages) {
                messages[e].done = false
            }
        }

    } while (true)
}