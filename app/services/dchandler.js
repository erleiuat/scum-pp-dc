const sn = global.chalk.red('[DISCORD-HANDLER] -> ')

async function consoleMsg(msg) {
    if (
        msg.member.hasPermission('ADMINISTRATOR') &&
        msg.author.id !== process.env.DISCORD_BOT_ID
    ) {
        console.log(sn + 'Console message detected!')
        global.commands[msg.id] = {
            message: 'console_msg',
            user: msg.author.username,
            content: msg.content
        }
    }
}

exports.start = async function start(dcClient) {
    dcClient.on('message', async msg => {
        if (msg.channel.id == process.env.DISCORD_CH_CONSOLE) consoleMsg(msg)
    })
}