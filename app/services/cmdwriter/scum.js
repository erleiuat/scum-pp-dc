const sn = global.chalk.blue('[CMDWriter] -> [SCUM] -> ')
const cp = require('child_process')

exports.start = async function start() {
    return new Promise((resolve) => {
        global.gameReady = false
        console.log(sn + 'Starting Scum.')
        const scumCmd = cp.exec('py ./app/cpscripts/start_game.py', (error, stdout, stderr) => {
            console.log(sn + 'STDOUT: ' + stdout)
            if (!error) {
                global.gameReady = true
                resolve()
                return
            }
            console.log(sn + error.stack)
            console.log(sn + 'Error code: ' + error.code)
            console.log(sn + 'Signal received: ' + error.signal)
            console.log(sn + 'RETRYING IN 10s')
            await global.sleep.timer(10)
            await this.start()
            resolve()
        })

        scumCmd.on('exit', code => {
            console.log(sn + 'Exited with exit code ' + code)
        })
    })
}

exports.isReady = async function isReady() {
    return new Promise((resolve) => {
        global.gameReady = false
        console.log(sn + 'Checking if Scum is ready.')
        const scumCmd = cp.exec('py ./app/cpscripts/is_running.py', (error, stdout, stderr) => {
            console.log(sn + 'STDOUT: ' + stdout)
            if (!error) {
                global.gameReady = true
                resolve(true)
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
            throw new Error('Message could not be send.')
        })

        scumCmd.on('exit', code => {
            console.log(sn + 'Exited with exit code ' + code)
        })
    })
}