const sn = global.chalk.magenta('[CMD-Handler] -> [SCUM] -> ')
const cp = require('child_process')
let starting = false
let checking = false

exports.makeBreak = async function makeBreak() {
    return new Promise((resolve) => {
        global.gameReady = false
        console.log(sn + 'Taking a break.')
        const scumCmd = cp.exec('py ./app/cpscripts/make_break.py', (error, stdout, stderr) => {
            if (error) {
                console.log(sn + 'STDOUT: ' + stdout)
                console.log(sn + error.stack)
                console.log(sn + 'Error code: ' + error.code)
                console.log(sn + 'Signal received: ' + error.signal)
            }
        })

        scumCmd.on('exit', code => {
            global.gameReady = true
            console.log(sn + 'Exited with exit code ' + code)
            resolve()
        })
    })
}

/*
exports.spam = async function spam(user) {
    return new Promise((resolve) => {
        global.gameReady = false
        console.log(sn + 'Spaming DC.')
        const scumCmd = cp.exec('py ./app/cpscripts/dc_spam.py "' + user + '"', (error, stdout, stderr) => {
            if (error) {
                console.log(sn + 'STDOUT: ' + stdout)
                console.log(sn + error.stack)
                console.log(sn + 'Error code: ' + error.code)
                console.log(sn + 'Signal received: ' + error.signal)
            }
        })

        scumCmd.on('exit', code => {
            global.gameReady = true
            console.log(sn + 'Exited with exit code ' + code)
            resolve()
        })
    })
}
*/

exports.start = async function start() {
    return new Promise((resolve) => {
        if (starting) {
            resolve(true)
            return
        }
        starting = true
        global.gameReady = false
        console.log(sn + 'Starting Scum.')
        const scumCmd = cp.exec('py ./app/cpscripts/start_game.py', (error, stdout, stderr) => {
            if (!error) {
                global.commands = {}
                global.gameReady = true
                resolve(true)
            } else {
                console.log(sn + 'STDOUT: ' + stdout)
                console.log(sn + error.stack)
                console.log(sn + 'Error code: ' + error.code)
                console.log(sn + 'Signal received: ' + error.signal)
                console.log(sn + 'RETRYING IN 10s')
                global.sleep.timer(10).then(() => {
                    this.start().then(() => {
                        resolve(true)
                    })
                })
            }
        })

        scumCmd.on('exit', code => {
            console.log(sn + 'Exited with exit code ' + code)
            starting = false
        })
    })
}

exports.isReady = async function isReady() {
    return new Promise((resolve) => {
        if (checking || starting) {
            resolve(true)
            return
        }
        checking = true
        global.gameReady = false
        console.log(sn + 'Checking if Scum is ready.')
        const scumCmd = cp.exec('py ./app/cpscripts/is_running.py', (error, stdout, stderr) => {
            if (!error) {
                global.gameReady = true
                resolve(true)
            } else {
                console.log(sn + 'STDOUT: ' + stdout)
                console.log(sn + error.stack)
                console.log(sn + 'Error code: ' + error.code)
                console.log(sn + 'Signal received: ' + error.signal)
                resolve(false)
            }
        })

        scumCmd.on('exit', code => {
            console.log(sn + 'Exited with exit code ' + code)
            checking = false
        })
    })
}

exports.send = async function send(command) {
    return new Promise((resolve) => {
        console.log(sn + 'Sending: ' + command)
        const scumCmd = cp.exec('py ./app/cpscripts/send_command.py ' + command + '', (error, stdout, stderr) => {
            console.log(sn + 'STDOUT: ' + stdout)
            if (!error) {
                resolve()
                return
            }
            console.log(sn + error.stack)
            console.log(sn + 'Error code: ' + error.code)
            console.log(sn + 'Signal received: ' + error.signal)
            resolve(false)
        })

        scumCmd.on('exit', code => {
            console.log(sn + 'Exited with exit code ' + code)
        })
    })
}