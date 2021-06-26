//const sn = global.chalk.magenta('[GAMEBOT] -> ')
const cp = require('child_process')

let bot = false

exports.start = async function start() {
    bot = cp.spawn('py', ['./app/gamebot/scripts/gamebot.py'])
    bot.stdin.setEncoding('utf-8')
    bot.stdout.pipe(process.stdout)
    bot.stderr.on('data', (data) => {
        console.log(`${data}`)
    })
}


exports.message = async function message(scope, input) {
    bot.stdin.write('MESSAGE\n')
    bot.stdin.write(scope + '\n')
    bot.stdin.write(input + '\n')
}

exports.action = async function action(input) {
    bot.stdin.write('ACTION\n')
    bot.stdin.write(input + '\n')
}