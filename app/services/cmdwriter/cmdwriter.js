const sn = global.chalk.blue('[CMDWriter] -> ')
const scum = require('./scum')

async function checkStatus() {
    do {
        await global.sleep.timer(60)
        if (global.newCmds) continue
        if (!await scum.isReady()) await scum.start()
    } while (true)
}

exports.start = async function start() {
    if (!await scum.isReady()) await scum.start()

    checkStatus()

    do {
        await global.sleep.timer(0.05)
        if (global.updates) continue
        if (!global.newCmds) continue
        console.log(sn + 'Processing new Commands')

        for (const e in global.cmds) {
            let cmdStr = ''
            for (const cmd of global.cmds[e].commands) cmdStr += ' "' + (cmd.replace(/"/gmi, "'")) + '" '
            await scum.send(cmdStr)
            delete global.cmds[e]
        }

        global.newCmds = false
    } while (true)

}