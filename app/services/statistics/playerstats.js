const Discord = require('discord.js')
const sn = global.chalk.green('[STATISTICS] -> ')
const admins = [
    '76561198058320009',
    '76561198082374095',
    '76561199166410611',
    '76561198046659274'
]

exports.online = async function online(statesOrg) {
    let statesTmp = {}
    for (u in statesOrg)
        if (statesOrg[u].login) statesTmp[u] = statesOrg[u]
    return this.list(statesTmp, '00ff00')
}

exports.list = async function list(statesOrg) {

    let msgs = []
    let states = []
    for (u in statesOrg) states.push({
        steamID: u,
        ...statesOrg[u]
    })

    states.sort((a, b) => (a.lastLogin.getTime() > b.lastLogin.getTime()) ? 1 : -1)
    for (let i = 0; i < states.length; i++) {
        let formed = getDuration(states[i].playtime)
        msgs.push('\n-----\n**' + states[i].user + '**\nSteamID: ' + states[i].steamID + '\nPlaytime: ' + formed.d + 'd ' + formed.h + 'h ' + formed.m + 'm \nLast Login: ' + states[i].lastLogin.toLocaleString() + '\nTotal Logins: ' + states[i].totalLogins)
    }

    return msgs
}

exports.ranking = async function ranking(statesOrg) {

    let msgs = []
    let states = []
    for (const e in statesOrg)
        if (!admins.includes(e)) states.push(statesOrg[e])

    states.sort((a, b) => (a.playtime > b.playtime) ? 1 : -1).reverse()
    let tmpMsg = ''
    for (let i = 3; i < 10; i++) {
        let formed = getDuration(states[i].playtime)
        tmpMsg = '\n**' + (i + 1) + '. ' + states[i].user + '**\nPlaytime: ' + formed.d + ' Days, ' + formed.h + ' Hours, ' + formed.m + ' Minutes \nLogins: ' + states[i].totalLogins + '\n' + tmpMsg
    }

    msgs.push(tmpMsg)
    msgs.push('\n-----\n')
    msgs.push(formWinner(states[2], '3', 'bf8970', 'medal/bronze.png'))
    msgs.push(formWinner(states[1], '2', 'bec2cb', 'medal/silver.png'))
    msgs.push(formWinner(states[0], '1', 'fdbf00', 'medal/gold.png'))
    msgs.push('\n-----\n Best players in the last 7 days by playing time / Beste Spieler der letzten 7 Tage nach Spielzeit')
    return msgs

}

function formWinner(user, place, color, img) {
    let pTime = getDuration(user.playtime)
    return new Discord.MessageEmbed({
        title: place + '. ' + user.user.toUpperCase(),
        color: color,
        thumbnail: {
            url: process.env.IMG_URL + img
        },
        footer: {
            text: user.totalLogins + ' Logins'
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
    })
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