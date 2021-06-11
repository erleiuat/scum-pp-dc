const Discord = require('discord.js')
const format = require('./format')
const sn = global.chalk.blue('[DCWriter] -> ')
const dump = {}

const channels = {
    kill: process.env.DISCORD_CH_KILL,
    chat: process.env.DISCORD_CH_CHAT,
    login: process.env.DISCORD_CH_LOGIN,
    admin: process.env.DISCORD_CH_ADMIN,
    dump: process.env.DISCORD_CH_CONSOLE
}

async function iterate(logFunction, dcClient) {
    do {
        await global.sleep.timer(0.01)
        if (global.updates) continue
        await logFunction(dcClient)
    } while (true)
}

exports.start = async function start(dcClient) {
    await format.loadWeapons()
    iterate(sendKills, dcClient)
    iterate(sendChats, dcClient)
    iterate(sendAdmins, dcClient)
    iterate(sendLogins, dcClient)
    iterate(sendDump, dcClient)
}

async function sendKills(dcClient) {
    if (Object.keys(global.newEntries.kill).length <= 0) return
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.kill)

    for (const e in global.newEntries.kill) {
        await channel.send(new Discord.MessageEmbed(await format.kill(global.newEntries.kill[e])))
        if (!global.newEntries.kill[e].Victim.IsInGameEvent) global.commands['kill_' + global.newEntries.kill[e].Victim.UserId] = {
            message: 'kill_feed',
            time: global.newEntries.kill[e].time,
            killer: global.newEntries.kill[e].Killer.ProfileName,
            victim: global.newEntries.kill[e].Victim.ProfileName
        }
        console.log(sn + 'Kill sent: ' + e)
        dump[e] = {
            dump: 'kill',
            ...global.newEntries.kill[e]
        }
        delete global.newEntries.kill[e]
    }

}

async function sendChats(dcClient) {
    if (Object.keys(global.newEntries.chat).length <= 0) return
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.chat)

    for (const el in global.newEntries.chat) {
        if (global.newEntries.chat[el].type == 'Global') {
            let msg = await format.chat(global.newEntries.chat[el])
            if (msg.fields[0].value.match(/(?:admin|support)/gmi))
                await channel.send(' <@&' + process.env.DISCORD_ROLE_SUPPORT + '> ')
            await channel.send(new Discord.MessageEmbed(msg))
            console.log(sn + 'Chat sent: ' + el)
        }
        if (global.newEntries.chat[el].message.trim().substring(0, 1) == '!') {
            console.log(sn + 'Command detected!')
            global.commands[el] = global.newEntries.chat[el]
        }
        dump[el] = {
            dump: 'chat',
            ...global.newEntries.chat[el]
        }
        delete global.newEntries.chat[el]
    }

}

async function sendAdmins(dcClient) {
    if (Object.keys(global.newEntries.admin).length <= 0) return
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.admin)

    for (const el in global.newEntries.admin) {
        let line = global.newEntries.admin[el]
        let shouldHide = false

        if (
            line.steamID.includes('76561198058320009') || // Joppala
            line.steamID.includes('76561198082374095') // || // Lox
            // line.steamID.includes('76561198046659274') // LamaAndy
        ) {
            if (line.message.toLowerCase().includes('teleport')) shouldHide = true
            else if (line.message.toLowerCase().includes('location')) shouldHide = true
            else if (line.message.toLowerCase().includes('spawn')) shouldHide = true
            else if (line.message.toLowerCase().includes('showotherplayerinfo')) shouldHide = true
            else if (line.message.toLowerCase().includes('godmode')) shouldHide = true
            else if (line.message.toLowerCase().includes('setfakename')) shouldHide = true
            else if (line.message.toLowerCase().includes('clearfakename')) shouldHide = true
            else if (line.message.toLowerCase().includes('shownameplates')) shouldHide = true
        }

        //Ingame-Bot (ScumFiction)
        if (line.steamID.includes('76561199166410611')) {
            if (line.message.toLowerCase().includes('setfakename')) shouldHide = true
            else if (line.message.toLowerCase().includes('clearfakename')) shouldHide = true
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
    if (Object.keys(global.newEntries.login).length <= 0) return
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
    if (Object.keys(dump).length <= 0) return
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.dump)

    for (const el in dump) {
        let msg = false

        if (dump[el].dump == 'kill') msg = {
            ...await format.kill(dump[el]),
            color: 'ff0000'
        }
        else if (dump[el].dump == 'chat') {
            msg = {
                ...await format.chat(dump[el]),
                color: '0000ff',
                description: dump[el].type.toUpperCase() + '-CHAT'
            }
            if (msg.fields[0].value.match(/(?:admin|support|abuse|abuze)/gmi))
                await channel.send(' <@&' + process.env.DISCORD_ROLE_SUPPORT + '> ')
        } else if (dump[el].dump == 'admin') msg = {
            ...await format.admin(dump[el]),
            color: '00ff00'
        }
        else if (dump[el].dump == 'login') msg = {
            ...await format.login(dump[el]),
            color: '242424'
        }

        if (msg) await channel.send(new Discord.MessageEmbed(msg))
        console.log(sn + 'DUMP sent: ' + el)
        delete dump[el]

    }
}