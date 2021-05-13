require('dotenv').config()
global.chalk = require('chalk')
global.args = require('minimist')(process.argv.slice(2))
global.sleep = require('./app/plugins/sleep')
global.updates = true
global.newEntries = {
    kill: {},
    chat: {},
    admin: {},
    login: {}
}


const sn = global.chalk.red('[MAIN] -> ')
const bot = require('./app/bot')

console.log('\n----------------------------------------------------------\nWelcome to SDP-Bot 1.0!\n----------------------------------------------------------\n')

bot.start()