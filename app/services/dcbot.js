const sn = global.chalk.red('[DISCORD-BOT] -> ')

async function consoleMsg(msg) {
    if (
        msg.member.hasPermission('ADMINISTRATOR') &&
        msg.author.id !== process.env.DISCORD_BOT_ID
    ) {
        global.commands[msg.id] = {
            message: 'console_msg',
            user: msg.author.username,
            content: msg.content
        }
    }
}

async function clearchat(msg) {
    if (msg.member.hasPermission('ADMINISTRATOR')) {
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

exports.start = async function start(dcClient) {
    dcClient.on("message", async msg => {
        if (msg.channel.id == process.env.DISCORD_CH_CONSOLE) consoleMsg(msg)
        if (msg.content.toLowerCase().startsWith("!clearchat")) clearchat(msg)
    })
}