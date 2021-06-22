const sn = global.chalk.magenta('[CMD-Handler] -> [SCUM] -> ')
const cp = require('child_process')
let starting = false
let checking = false
let latestExec = {}

exports.start = async function start() {
    return new Promise((resolve) => {
        if (starting) resolve(true)
        else {

            starting = true
            global.gameReady = false
            console.log(sn + 'Starting Scum.')

            let ls = cp.spawn('py', ['./app/cpscripts/start_game.py'])
            ls.stdout.on('data', (data) => {
                console.log(`${data}`)
            })
            ls.stderr.on('data', (data) => {
                console.error(`${data}`)
            })
            ls.on('close', (code) => {
                starting = false
                console.log(`Child process exited with code ${code}`)
                if (code != 0) {
                    global.sleep.timer(10).then(() => {
                        this.start().then(res => {
                            resolve(res)
                        })
                    })
                } else {
                    global.commands = {}
                    global.gameReady = true
                    resolve(true)
                }
            })

        }
    })
}

exports.isReady = async function isReady() {
    return new Promise((resolve) => {
        if (checking || starting) resolve(true)
        else {

            checking = true
            global.gameReady = false
            console.log(sn + 'Checking if Scum is ready.')

            let ls = cp.spawn('py', ['./app/cpscripts/is_running.py'])
            ls.stdout.on('data', (data) => {
                console.log(`${data}`)
            })
            ls.stderr.on('data', (data) => {
                console.error(`${data}`)
            })
            ls.on('close', (code) => {
                checking = false
                console.log(`Child process exited with code ${code}`)
                if (code != 0) resolve(false)
                else {
                    global.gameReady = true
                    resolve(true)
                }
            })

        }
    })
}

exports.execScript = async function execScript(scriptName, clearCmds = false, force = false) {
    return new Promise((resolve) => {

        global.gameReady = false
        console.log(sn + 'Executing Script: ' + scriptName)

        let now = new Date().getTime()
        if (!force && latestExec[scriptName] && latestExec[scriptName] > (now - 30 * 60000)) {
            this.send(['#SetFakeName [SF-BOT]', 'Sorry, I can only do this once every 30 minutes.', '#ClearFakeName']).then(() => {
                global.gameReady = true
                resolve(true)
            })
        } else {
            latestExec[scriptName] = now
            let ls = cp.spawn('py', ['./app/cpscripts/' + scriptName])
            let data = ls.stdout.on('data', (data) => {
                console.log(`${data}`)
                return data
            })
            ls.stderr.on('data', (data) => {
                console.error(`${data}`)
            })
            ls.on('close', (code) => {
                console.log(`Child process exited with code ${code}`)
                if (code != 0) resolve(false)
                else {
                    if (clearCmds) global.commands = {}
                    global.gameReady = true
                    resolve(data || true)
                }
            })
        }
    })
}

exports.send = async function send(commands) {
    return new Promise((resolve) => {
        if (!commands.length) {
            resolve(true)
            return
        }
        global.gameReady = false
        console.log(sn + 'Sending: ' + commands.join())
        let ls = cp.spawn('py', ['./app/cpscripts/send_command.py', ...commands])
        ls.stdout.on('data', (data) => {
            console.log(`${data}`)
        })
        ls.stderr.on('data', (data) => {
            console.error(`${data}`)
        })
        ls.on('close', (code) => {
            console.log(`Child process exited with code ${code}`)
            if (code != 0) resolve(false)
            else {
                global.gameReady = true
                resolve(true)
            }
        })

    })
}