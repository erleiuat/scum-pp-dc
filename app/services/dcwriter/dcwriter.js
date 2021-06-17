const Discord = require('discord.js')
const format = require('./format')
const sn = global.chalk.cyan('[DCWriter] -> ')
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
        if (global.updatingFTP) continue
        await logFunction(dcClient)
    } while (true)
}

exports.start = async function start(dcClient) {
    await format.loadWeapons()
    iterate(sendKills, dcClient)
    iterate(sendMines, dcClient)
    iterate(sendChats, dcClient)
    iterate(sendAdmins, dcClient)
    iterate(sendLogins, dcClient)
    iterate(sendDump, dcClient)
}

async function sendMines(dcClient) {
    if (Object.keys(global.newEntries.mines).length <= 0) return
    for (const e in global.newEntries.mines) {
        if (global.newEntries.mines[e].action == 'armed') global.commands['mine_' + global.newEntries.mines[e].steamID] = {
            time: global.newEntries.mines[e].time,
            message: 'mine_armed'
        }
        dump[e] = {
            dump: 'mines',
            ...global.newEntries.mines[e]
        }
        delete global.newEntries.mines[e]
    }
}

async function sendKills(dcClient) {
    if (Object.keys(global.newEntries.kill).length <= 0) return
    let channel = dcClient.channels.cache.find(channel => channel.id === channels.kill)

    for (const e in global.newEntries.kill) {
        await format.kill(global.newEntries.kill[e])
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
        aList = await global.admins.list()

        if (aList[line.steamID] && aList[line.steamID].hideCommands) {
            if (line.message.toLowerCase().includes('teleport')) shouldHide = true
            else if (line.message.toLowerCase().includes('location')) shouldHide = true
            else if (line.message.toLowerCase().includes('spawn')) shouldHide = true
            else if (line.message.toLowerCase().includes('showotherplayerinfo')) shouldHide = true
            else if (line.message.toLowerCase().includes('godmode')) shouldHide = true
            else if (line.message.toLowerCase().includes('setfakename')) shouldHide = true
            else if (line.message.toLowerCase().includes('clearfakename')) shouldHide = true
            else if (line.message.toLowerCase().includes('shownameplates')) shouldHide = true
        }

        if (line.message.toLowerCase().includes('setfakename')) shouldHide = true
        else if (line.message.toLowerCase().includes('clearfakename')) shouldHide = true

        if (!shouldHide) {
            if (aList[line.steamID].alertCommands) await channel.send('**The following command was not executed by the bot but by <@' + aList[line.steamID].discord + '>. Please explain by replying to the message what you needed the command for.**')
            await channel.send(new Discord.MessageEmbed(await format.admin(global.newEntries.admin[el])))
            if (aList[line.steamID].alertCommands) await channel.send('**If you don\'t want to receive admin abuse notifications in the future, change the notification settings of this channel to "nothing"**')
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
        aList = await global.admins.list()

        if (aList[global.newEntries.login[el].steamID] && aList[global.newEntries.login[el].steamID].hideLogin) {

        } else if (global.newEntries.login[el].type == 'login') global.commands['auth_' + global.newEntries.login[el].steamID] = {
            message: 'auth_log',
            time: global.newEntries.login[el].time,
            user: global.newEntries.login[el].user,
            text: 'is joining'
        }
        else if (global.newEntries.login[el].type == 'logout') global.commands['auth_' + global.newEntries.login[el].steamID] = {
            message: 'auth_log',
            time: global.newEntries.login[el].time,
            user: global.newEntries.login[el].user,
            text: 'left'
        }

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
        else if (dump[el].dump == 'mines') msg = {
            ...await format.mines(dump[el]),
            color: 'F3EA5F'
        }

        if (msg) await channel.send(new Discord.MessageEmbed(msg))
        console.log(sn + 'DUMP sent: ' + el)
        delete dump[el]

    }
}