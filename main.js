global.chalk = require('chalk')
const sn = global.chalk.inverse('[MAIN] -> ')

console.log('\n\n' + sn + '----------------------------------------------------------')
console.log(sn + 'Welcome to SDP-Bot 1.0!')
console.log(sn + '----------------------------------------------------------\n\n')

console.log(sn + 'Starting directory: ' + process.cwd())
try {
  process.chdir(__dirname)
  console.log(sn + 'New directory: ' + process.cwd())
} catch (err) {
  console.log(sn + 'chdir: ' + err)
}

process.on('uncaughtException', err => {
  console.error(sn + 'There was an uncaught error', err)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  console.log(sn + 'Unhandled rejection', err)
  process.exit(1)
})

console.log('\n\n' + sn + '----------------------------------------------------------')
console.log(sn + 'Bot initialized, starting processes')
console.log(sn + '----------------------------------------------------------\n\n')


require('dotenv').config()
global.sleep = require('./app/plugins/sleep')
global.io = require('@pm2/io')
global.gameReady = false
global.ingameTime = false
global.playersOnline = 0
global.newCmds = false
global.playerlist = {}
global.updates = true
global.commands = {}
global.newEntries = {
  kill: {},
  chat: {},
  admin: {},
  login: {}
}

const bot = require('./app/bot')
bot.start()