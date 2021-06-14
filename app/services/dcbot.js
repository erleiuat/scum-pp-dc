const sn = global.chalk.red('[DISCORD-BOT] -> ')
const fetch = require('node-fetch')

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

async function doFetch(url) {
    return await fetch(url, {
        method: 'Get'
    }).then(res => res.text()).then(body => {
        return body
    })
}

async function processContent(data, dcClient) {
    let channel = dcClient.channels.cache.find(channel => channel.id === data.id)
    await clearChannel(channel)

    for (const e in data.content) {
        let part = data.content[e]
        if (part['type'] == 'image') {
            await channel.send({
                files: [part['data']]
            })
        } else if (part['type'] == 'text') {
            let text = await doFetch(part['data'])
            if (text.includes('{{SPLIT}}')) textChunks = text.split('{{SPLIT}}')
            else textChunks = [text]
            for (const chunk in textChunks) {
                if (textChunks[chunk] && textChunks[chunk].length >= 1) channel.send(textChunks[chunk])
            }
        }
    }
}

async function buildServer(dcClient) {
    let data = await fetch(process.env.DATA_URL + 'dc_text/data.json', {
        method: 'Get'
    }).then(res => res.json()).then(json => {
        return json
    })
    for (const i in data) await processContent(data[i], dcClient)
}

async function clearChannel(channel) {
    var msg_size = 100;
    while (msg_size == 100) await channel.bulkDelete(100, true)
        .then(messages => msg_size = messages.size)
        .catch(console.error)
}

async function clearchat(msg) {
    if (msg.member.hasPermission('ADMINISTRATOR')) {
        console.log(sn + '"!clearchat" detected! Clearing channel...')
        await clearChannel(msg.channel)
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

    buildServer(dcClient)

}