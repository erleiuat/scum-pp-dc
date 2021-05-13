const fs = require('fs')
const Discord = require('discord.js')
const sn = global.chalk.white('[STATISTICS] -> ')

const admins = [
    '76561198058320009', 
    '76561198082374095', 
    '76561198907112461', 
    '76561199166410611', 
    '76561198046659274'
]

let users = []
let newData = false
let listCache = []

exports.start = async function start(dcClient) {

    let iteration = 1
    let channel = dcClient.channels.cache.find(channel => channel.id === process.env.channel_playtime)
    let channelHidden = dcClient.channels.cache.find(channel => channel.id === process.env.channel_hiddenstats)

    do {
        console.log(sn + 'Processing Stats (#' + iteration + ')')
        await updateTimes()
        await updateDC(channel)
        await updateHidden(channelHidden)
        console.log(sn + 'Processing Stats done')
        iteration++
        await sleep.timer(60)
    } while (true)

}

async function updateHidden(channel) {

    if (!newData) return
    newData = false
    await clearChannel(channel)
    let hArray = []
    for (u in users) hArray.push({
        steamID: u,
        ...users[u]
    })

    hArray.sort((a, b) => (a.login.getTime() > b.login.getTime()) ? 1 : -1)
    for (let i = 0; i < hArray.length; i++) {
        let formed = getDuration(hArray[i].playtime)
        await channel.send(new Discord.MessageEmbed({
            title: hArray[i].name,
            description: 'SteamID: ' + hArray[i].steamID + '\nPlaytime: ' + formed.d + 'd ' + formed.h + 'h ' + formed.m + 'm \nLast Login: ' + hArray[i].login.toLocaleString() + '\nTotal Logins: ' + hArray[i].totalLogins
        }))
    }

}

async function updateDC(channel) {
    let usersArray = []
    for (u in users) {
        if (!admins.includes(u)) usersArray.push(users[u])
    }
    usersArray.sort((a, b) => (a.playtime > b.playtime) ? 1 : -1).reverse()
    if (JSON.stringify(listCache) == JSON.stringify(usersArray)) return
    newData = true
    await clearChannel(channel)
    await sendList(channel, usersArray)
    listCache = usersArray
}

async function sendList(channel, list) {

    let msgs = []
    for (let i = 3; i < list.length; i++) {
        let formed = getDuration(list[i].playtime)
        msgs.push('\n**' + (i + 1) + '. ' + list[i].name + '**\nPlaytime: ' + formed.d + ' Days, ' + formed.h + ' Hours, ' + formed.m + ' Minutes \nLogins: ' + list[i].totalLogins + '\n\n')
    }

    msgs.reverse()
    for (const msg of msgs) {
        await channel.send(msg)
    }

    let pTime = getDuration(list[2].playtime)
    await channel.send(new Discord.MessageEmbed({
        title: '3. ' + list[2].name.toUpperCase(),
        color: 'bf8970',
        thumbnail: {
            url: process.env.IMG_URL + 'medal/bronze.png'
        },
        footer: {
            text: list[2].totalLogins + ' Logins'
        },
        fields: [{
                name: 'Days',
                value: pTime.d,
                inline: true
            },
            {
                name: 'Hours',
                value: pTime.h,
                inline: true
            },
            {
                name: 'Minutes',
                value: pTime.m,
                inline: true
            }
        ]
    }))

    pTime = getDuration(list[1].playtime)
    await channel.send(new Discord.MessageEmbed({
        title: '2. ' + list[1].name.toUpperCase(),
        color: 'bec2cb',
        thumbnail: {
            url: process.env.IMG_URL + 'medal/silver.png'
        },
        footer: {
            text: list[1].totalLogins + ' Logins'
        },
        fields: [{
                name: 'Days',
                value: pTime.d,
                inline: true
            },
            {
                name: 'Hours',
                value: pTime.h,
                inline: true
            },
            {
                name: 'Minutes',
                value: pTime.m,
                inline: true
            }
        ]
    }))

    pTime = getDuration(list[0].playtime)
    await channel.send(new Discord.MessageEmbed({
        title: '1. ' + list[0].name.toUpperCase(),
        color: 'fdbf00',
        thumbnail: {
            url: process.env.IMG_URL + 'medal/gold.png'
        },
        footer: {
            text: list[0].totalLogins + ' Logins'
        },
        fields: [{
                name: 'Days',
                value: pTime.d,
                inline: true
            },
            {
                name: 'Hours',
                value: pTime.h,
                inline: true
            },
            {
                name: 'Minutes',
                value: pTime.m,
                inline: true
            }
        ]
    }))

}

function getDuration(milli) {

    let minutes = milli / 60000
    let hours = minutes / 60
    let days = Math.floor(Math.floor(hours) / 24)
    minutes = (hours - Math.floor(hours)) * 60
    hours = Math.floor(hours) - (days * 24)

    return {
        d: Math.floor(days),
        h: Math.floor(hours),
        m: Math.floor(minutes)
    }

}

async function clearChannel(channel) {
    let fetched
    do {
        fetched = await channel.messages.fetch({
            limit: 100
        })
        channel.bulkDelete(fetched)
    } while (fetched.size >= 2)
}

async function updateTimes() {
    let file = await getLogins()
    users = []

    for (el in file) {

        if (file[el].type == 'login') {

            if (!users[file[el].steamID]) users[file[el].steamID] = {
                name: null,
                tmpID: null,
                login: null,
                playtime: 0,
                totalLogins: 0
            }

            users[file[el].steamID].name = file[el].user
            users[file[el].steamID].tmpID = file[el].userID
            users[file[el].steamID].login = formDate(file[el].time)
            users[file[el].steamID].totalLogins += 1

        } else {

            let date = formDate(file[el].time)
            let tmpID = file[el].userID

            for (u in users)
                if (users[u].tmpID == tmpID) {
                    users[u].playtime += date.getTime() - users[u].login.getTime()
                    users[u].tmpID = null
                    break;
                }

        }

    }

}

function formDate(dateStr) {
    dateStr.date = dateStr.date.split('.')
    return new Date(dateStr.date[2] + '-' + dateStr.date[1] + '-' + dateStr.date[0] + 'T' + dateStr.time)
}

async function getLogins() {
    return JSON.parse(fs.readFileSync('./app/storage/logs/login.json'))
}