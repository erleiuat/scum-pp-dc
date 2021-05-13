const Discord = require('discord.js')
const format = require('./format')
const sn = global.chalk.blue('[DCWriter] -> ')
const dump = {}

const channels = {
    kill: process.env.DISCORD_CH_KILL,
    chat: process.env.DISCORD_CH_CHAT,
    login: process.env.DISCORD_CH_LOGIN,
    admin: process.env.DISCORD_CH_ADMIN,
    dump: process.env.DISCORD_CH_DUMP
}


exports.start = async function start(dcClient) {

    do {
        await global.sleep.timer(1)
        if (Object.keys(global.newEntries.kill).length > 0) await sendKills(dcClient)
        if (Object.keys(global.newEntries.chat).length > 0) await sendChats(dcClient)
        if (Object.keys(global.newEntries.admin).length > 0) await sendAdmins(dcClient)
        if (Object.keys(global.newEntries.login).length > 0) await sendLogins(dcClient)
        if (Object.keys(dump).length > 0) await sendDump(dcClient)
    } while (true)

}

async function sendKills(dcClient) {
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.kill)
    for (const el in global.newEntries.kill) {
        await channel.send(new Discord.MessageEmbed(await format.kill(global.newEntries.kill[el])))
        console.log(sn + 'Kill sent: ' + el)
        dump[el] = {
            dump: 'kill',
            ...global.newEntries.kill[el]
        }
        delete global.newEntries.kill[el]
    }
}

async function sendChats(dcClient) {
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.chat)
    for (const el in global.newEntries.chat) {
        if (global.newEntries.chat[el].type == 'Global') {
            await channel.send(new Discord.MessageEmbed(await format.chat(global.newEntries.chat[el])))
            console.log(sn + 'Chat sent: ' + el)
        }
        dump[el] = {
            dump: 'chat',
            ...global.newEntries.chat[el]
        }
        delete global.newEntries.chat[el]
    }
}

async function sendAdmins(dcClient) {
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.admin)
    for (const el in global.newEntries.admin) {

        let line = global.newEntries.admin[el]
        let shouldHide = false

        if (
            line.steamID.includes('76561198058320009') ||
            line.steamID.includes('76561198082374095') ||
            line.steamID.includes('76561198907112461') ||
            line.steamID.includes('76561198046659274')
        ) {
            if (line.message.toLowerCase().includes('teleport')) shouldHide = true
            else if (line.message.toLowerCase().includes('location')) shouldHide = true
            else if (line.message.toLowerCase().includes('spawn')) shouldHide = true
            else if (line.message.toLowerCase().includes('showotherplayerinfo')) shouldHide = true
            else if (line.message.toLowerCase().includes('godmode')) shouldHide = true
        }

        if (!shouldHide) {
            await channel.send(new Discord.MessageEmbed(await format.admin(global.newEntries.admin[el])))
            console.log(sn + 'Admin sent: ' + el)
        }

        dump[el] = {
            dump: 'admin',
            ...global.newEntries.admin[el]
        }
        delete global.newEntries.admin[el]
    }
}

async function sendLogins(dcClient) {
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.login)
    for (const el in global.newEntries.login) {
        await channel.send(new Discord.MessageEmbed(await format.login(global.newEntries.login[el])))
        console.log(sn + 'Login sent: ' + el)
        dump[el] = {
            dump: 'login',
            ...global.newEntries.login[el]
        }
        delete global.newEntries.login[el]
    }
}

async function sendDump(dcClient) {
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.dump)
    for (const el in dump) {

        let msg = false
        if (dump[el].dump == 'kill') msg = {...await format.kill(dump[el]), color: 'ff0000'}
        else if (entry.dump == 'chat') msg = {...await format.kill(dump[el]), color: '0000ff'}
        else if (entry.dump == 'admin') msg = {...await format.kill(dump[el]), color: '00ff00'}
        else if (entry.dump == 'login') msg = {...await format.kill(dump[el]), color: '242424'}

        if(msg) await channel.send(new Discord.MessageEmbed(msg))
        console.log(sn + 'DUMP sent: ' + el)
        delete dump[el]
    }
}