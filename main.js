global.sleep = require('./app/plugins/sleep')
global.chalk = require('chalk')
global.io = require('@pm2/io')
global.ingameBotOnline = true
require('dotenv').config()
global.ingameTime = false
global.playersOnline = 0
global.playerlist = {}
global.updates = true
global.commands = {}
global.newEntries = {
    kill: {},
    chat: {},
    admin: {},
    login: {}
}

console.log('\n----------------------------------------------------------\nWelcome to SDP-Bot 1.0!\n----------------------------------------------------------\n')

const sn = global.chalk.red('[MAIN] -> ')
const bot = require('./app/bot')

process.on('uncaughtException', err => {
    console.error(sn + 'There was an uncaught error', err)
    process.exit(1)
})

process.on('unhandledRejection', err => {
    console.log(sn + 'Unhandled rejection', err)
    process.exit(1)
})

console.log('\n----------------------------------------------------------\nBot initialized, starting processes\n----------------------------------------------------------\n')


bot.start()