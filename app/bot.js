const sn = global.chalk.cyan('[BOT] -> ')

const Discord = require('discord.js')
const dcClient = new Discord.Client()
const ftpWatcher = require('./services/ftpwatcher')
const logProcessor = require('./services/logprocessor/logprocessor')
const dcWriter = require('./services/dcwriter/dcwriter')
const state = require('./services/state')
const statistics = require('./services/statistics/statistics')
const cmdHandler = require('./services/cmdhandler/cmdhandler')
const cmdWriter = require('./services/cmdwriter/cmdwriter')
const dcBot = require('./services/dcbot')

exports.start = async function start() {

    dcClient.on('ready', () => {

        console.log(sn + `Logged in as ${dcClient.user.tag}!`)

        console.log(sn + 'Starting Discord-Writer')
        dcWriter.start(dcClient)

        console.log(sn + 'Starting State-Display')
        state.start(dcClient)

        if (global.ingameBot) {
            console.log(sn + 'Starting Command-handler')
            cmdHandler.start()
            console.log(sn + 'Starting CMD-Writer')
            cmdWriter.start()
        } else {
            console.log(sn + 'Ingame-Bot is offline. Skipping Command-Handler.')
        }

        console.log(sn + 'Starting Statistics')
        statistics.start(dcClient)

        console.log(sn+'Starting Discord-Bot functionalities')
        dcBot.start(dcClient)

        console.log(sn + 'Starting FTP-Watcher')
        ftpWatcher.start()

        console.log(sn + 'Starting Log-Processor')
        logProcessor.start()

    })

    console.log(sn + 'Login on Discord')
    dcClient.login(process.env.DISCORD_TOKEN)

}