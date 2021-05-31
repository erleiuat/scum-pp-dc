require('dotenv').config()
global.io = require('@pm2/io')
global.chalk = require('chalk')
global.sleep = require('./app/plugins/sleep')
global.updates = true
global.commands = {}
global.playerlist = {}
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
    console.error('There was an uncaught error', err)
    process.exit(1)
})

process.on('unhandledRejection', err => {
    console.log('Unhandled rejection', err)
    process.exit(1)
})

console.log('\n----------------------------------------------------------\nBot initialized, starting processes\n----------------------------------------------------------\n')


bot.start()