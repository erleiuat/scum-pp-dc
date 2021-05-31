const sn = global.chalk.cyan('[BOT] -> ')

const Discord = require('discord.js')
const dcClient = new Discord.Client()
const ftpWatcher = require('./services/ftpwatcher')
const logProcessor = require('./services/logprocessor/logprocessor')
const dcWriter = require('./services/dcwriter/dcwriter')
const state = require('./services/state')
const statistics = require('./services/statistics/statistics')
const cmdHandler = require('./services/cmdhandler/cmdhandler')

exports.start = async function start() {

    dcClient.on('ready', () => {

        console.log(sn + `Logged in as ${dcClient.user.tag}!`)

        console.log(sn + 'Starting Discord-Writer')
        dcWriter.start(dcClient)

        console.log(sn + 'Starting State-Display')
        state.start(dcClient)

        console.log(sn + 'Starting Command-handler')
        cmdHandler.start()

        console.log(sn + 'Starting Statistics')
        statistics.start(dcClient)

        console.log(sn + 'Starting FTP-Watcher')
        ftpWatcher.start()

        console.log(sn + 'Starting Log-Processor')
        logProcessor.start()

    })

    dcClient.on("message", async msg => {

        if (msg.channel.id == process.env.DISCORD_CH_CONSOLE) {
            if (msg.member.hasPermission('ADMINISTRATOR')) {
                let tmpObj = {}
                tmpObj[msg.id] = {
                    type: 'global',
                    commands: [
                        '#SetFakeName [SF-BOT][' + msg.author.username + ']',
                        msg.content,
                        '#ClearFakeName'
                    ]
                }
                cmdHandler.sendCommands(msg.id, tmpObj)
            }
        }

        if (msg.member.hasPermission('ADMINISTRATOR')) {
            if (msg.content.toLowerCase().startsWith("!clearchat")) {
                console.log(sn + '"!clearchat" detected! Clearing channel...')
                let fetched
                do {
                    fetched = await msg.channel.messages.fetch({
                        limit: 100
                    })
                    if (fetched.size > 0) msg.channel.bulkDelete(fetched)
                } while (fetched.size >= 2)
                console.log(sn + 'Channel cleaned.')
            }
        }

    })

    console.log(sn + 'Login on Discord')
    dcClient.login(process.env.DISCORD_TOKEN)

}