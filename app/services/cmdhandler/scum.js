const sn = global.chalk.magenta('[CMD-Handler] -> [SCUM] -> ')
const cp = require('child_process')
let starting = false
let checking = false
let latestFirework = false

exports.makeBreak = async function makeBreak() {
    return new Promise((resolve) => {

        global.gameReady = false
        console.log(sn + 'Taking a break.')

        let ls = cp.spawn('py', ['./app/cpscripts/make_break.py '])
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

exports.firework = async function firework() {
    return new Promise((resolve) => {

        global.gameReady = false
        console.log(sn + 'Making firework.')

        let now = new Date().getTime()
        if (latestFirework && latestFirework > (now - 60 * 60000)) {
            this.send(['#SetFakeName [SF-BOT][FIREWORK]', 'Sorry, I can only do one firework per hour.', '#ClearFakeName']).then(()=>{
                global.gameReady = true
                resolve(true)
            })
        } else {
            latestFirework = now
            let ls = cp.spawn('py', ['./app/cpscripts/do_firework.py '])
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
        }
    })
}

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