require('dotenv').config()
global.chalk = require('chalk')
global.args = require('minimist')(process.argv.slice(2))
global.sleep = require('./app/plugins/sleep')
global.updates = true
global.playerlist = {}
global.newEntries = {
    kill: {},
    chat: {},
    admin: {},
    login: {}
}

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${err.message}`)
    process.exit(1)
})

const sn = global.chalk.red('[MAIN] -> ')
const bot = require('./app/bot')

console.log('\n----------------------------------------------------------\nWelcome to SDP-Bot 1.0!\n----------------------------------------------------------\n')

bot.start()