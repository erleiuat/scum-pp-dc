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
        async function wipe() {
            var msg_size = 100;
            while (msg_size == 100) {
                await msg.channel.bulkDelete(100, true)
                    .then(messages => msg_size = messages.size)
                    .catch(console.error);
            }
        }
        await wipe()
        console.log(sn + 'Channel cleaned.')
    }
}

async function setLang(msg) {
    let rEnglish = msg.channel.guild.roles.cache.find(role => role.id === process.env.DISCORD_ROLE_LANG_ENG)
    let rGerman = msg.channel.guild.roles.cache.find(role => role.id === process.env.DISCORD_ROLE_LANG_GER)
    let rPlayer = msg.channel.guild.roles.cache.find(role => role.id === process.env.DISCORD_ROLE_PLAYER)

    console.log(msg)
    if (msg.content.toLowerCase().trim() == 'english') {
        msg.member.roles.remove(rGerman)
        msg.member.roles.add(rPlayer)
        msg.member.roles.add(rEnglish)
    } else if (msg.content.toLowerCase().trim() == 'german' || msg.content.toLowerCase().trim() == 'deutsch') {
        msg.member.roles.remove(rEnglish)
        msg.member.roles.add(rPlayer)
        msg.member.roles.add(rGerman)
    } else {

    }

    await msg.delete()

}

exports.start = async function start(dcClient) {

    dcClient.on('message', async msg => {
        if (msg.channel.id == process.env.DISCORD_CH_CONSOLE) consoleMsg(msg)
        else if (msg.channel.id == process.env.DISCORD_CH_LANGUAGE) setLang(msg)
        if (msg.content.toLowerCase().startsWith('!clearchat')) clearchat(msg)
    })

    dcClient.on('guildMemberAdd', member => {

    })
}