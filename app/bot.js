const sn = global.chalk.bgRed('[BOT] -> ')

const Discord = require('discord.js')
const dcClient = new Discord.Client()
const ftpWatcher = require('./services/ftpwatcher')
const logProcessor = require('./services/logprocessor/logprocessor')
const dcWriter = require('./services/dcwriter/dcwriter')
const state = require('./services/state')
const statistics = require('./services/statistics/statistics')
const cmdHandler = require('./services/cmdhandler/cmdhandler')
const dcHandler = require('./services/dchandler')
const dcBot = require('./services/dcbot')

exports.start = async function start() {

    let args = process.argv.slice(2).map(el => el.replace('-', '').trim())
    dcClient.on('ready', () => {

        console.log(sn + `Logged in as ${dcClient.user.tag}!`)

        if (!args.includes('discord')) {

            console.log(sn + 'Starting Discord-Handler functionalities')
            dcHandler.start(dcClient)

            console.log(sn + 'Starting Discord-Writer')
            dcWriter.start(dcClient)

            console.log(sn + 'Starting State-Display')
            state.start(dcClient)

            console.log(sn + 'Starting Statistics')
            statistics.start(dcClient)

            console.log(sn + 'Starting FTP-Watcher')
            ftpWatcher.start()

            console.log(sn + 'Starting Log-Processor')
            logProcessor.start()

            if (!args.includes('noIngame')) {
                console.log(sn + 'Starting Command-handler')
                cmdHandler.start()
            }

            if (args.includes('withdiscord')) {
                console.log(sn + 'Starting Discord-Bot')
                dcBot.start(dcClient)
            }

        } else {
            console.log(sn + 'Starting Discord-Bot')
            dcBot.start(dcClient)
        }


    })

    console.log(sn + 'Login on Discord')
    dcClient.login(process.env.DISCORD_TOKEN)

}