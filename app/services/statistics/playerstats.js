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
        msgs.push('\n-----\n**' + states[i].user + '**\tSteamID: ' + states[i].steamID + '\n\tTime: ' + formed.d + 'd ' + formed.h + 'h\tLast Login: ' + states[i].lastLogin.toLocaleString() + '\tTotal Logins: ' + states[i].totalLogins)
    }

    return msgs
}

exports.rankingKills = async function rankingKills(statesOrg) {
    let msgs = []
    let states = []
    let tmpMsg = ''

    for (const e in statesOrg) {
        //if (admins.includes(e)) continue
        let tmpEl = {
            ...statesOrg[e],
            totalKills: statesOrg[e].kills.length,
            totalEventKills: statesOrg[e].eventKills.length,
            farthestEventkill: 0,
            farthestKill: 0,
            farthestAll: 0
        }

        if (tmpEl.totalKills > 0) 
            tmpEl.farthestKill = statesOrg[e].kills.sort((a, b) => (a.distance > b.distance) ? 1 : -1).reverse()[0].distance
            tmpEl.farthestAll = tmpEl.farthestKill
        
        if (tmpEl.totalEventKills > 0) 
            tmpEl.farthestEventkill = statesOrg[e].eventKills.sort((a, b) => (a.distance > b.distance) ? 1 : -1).reverse()[0].distance
            if(tmpEl.farthestEventkill > tmpEl.farthestAll) tmpEl.farthestAll = tmpEl.farthestEventkill
        
        states.push(tmpEl)
    }

    tmpMsg = '-----\n\n\n**Best Players by Kills**\n_Beste Spieler nach Kills_'
    tmpMsg += '\`\`\`diff\n+Rank  \tKills  \t\t Player\n- - - - - - - - - - - - - - - - - - - - - - - -\n\n'
    states.sort((a, b) => (a.totalKills > b.totalKills) ? 1 : -1).reverse()
    for (let i = 0; i < states.length; i++) {
        tmpMsg += nZero((i + 1), ' ') + '.\t\t  ' + nZero(states[i].totalKills, ' ') + '    \t\t' + states[i].name + '\n'
    }
    tmpMsg += '\n- - - - - - - - - - - - - - - - - - - - - - - -\n\`\`\`\n'
    msgs.push(tmpMsg)


    tmpMsg = '-----\n\n\n**Best Players by Kill-Distance**\n_Beste Spieler nach Kill-Distanz_'
    tmpMsg += '\`\`\`diff\n+Rank  \tDistance\t\t Player\n- - - - - - - - - - - - - - - - - - - - - - - -\n\n'
    states.sort((a, b) => (a.farthestAll > b.farthestAll) ? 1 : -1).reverse()
    for (let i = 0; i < states.length; i++) {
        tmpMsg += nZero((i + 1), ' ') + '.\t\t   ' + nZero(states[i].farthestAll, ' ') + '    \t\t' + states[i].name + '\n'
    }
    tmpMsg += '\n- - - - - - - - - - - - - - - - - - - - - - - -\n\`\`\`\n'
    msgs.push(tmpMsg)


    tmpMsg = '-----\n\n\n**Best Players by EVENT-Kills**\n_Beste Spieler nach EVENT-Kills_'
    tmpMsg += '\`\`\`diff\n+Rank  \tEvent-Kills\t  Player\n- - - - - - - - - - - - - - - - - - - - - - - -\n\n'
    states.sort((a, b) => (a.totalEventKills > b.totalEventKills) ? 1 : -1).reverse()
    for (let i = 0; i < states.length; i++) {
        tmpMsg += nZero((i + 1), ' ') + '.\t\t   ' + nZero(states[i].totalEventKills, ' ') + '    \t\t' + states[i].name + '\n'
    }
    tmpMsg += '\n- - - - - - - - - - - - - - - - - - - - - - - -\n\`\`\`\n'
    msgs.push(tmpMsg)

    return msgs
}

exports.rankingPlaytime = async function rankingPlaytime(statesOrg) {
    let msgs = []
    let states = []
    let tmpMsg = ''

    for (const e in statesOrg)
        if (!admins.includes(e)) states.push(statesOrg[e])

    tmpMsg = '-----\n\n\n**Best players in the last 7 days by playing time**\n_Beste Spieler der letzten 7 Tage nach Spielzeit_'
    tmpMsg += '\`\`\`diff\n+Rank  \tPlaytime\t\t Player\n- - - - - - - - - - - - - - - - - - - - - - - -\n\n'
    states.sort((a, b) => (a.playtime > b.playtime) ? 1 : -1).reverse()
    for (let i = 0; i < 10; i++) {
        let formed = getDuration(states[i].playtime)
        tmpMsg += nZero((i + 1), ' ') + '.\t\t' + formed.d + 'd ' + formed.h + 'h  \t\t' + states[i].user + '\n'
    }
    tmpMsg += '\n- - - - - - - - - - - - - - - - - - - - - - - -\n\`\`\`\n'
    msgs.push(tmpMsg)

    return msgs
}

function formWinner(user, place, color, img) {
    let pTime = getDuration(user.playtime)
    return new Discord.MessageEmbed({
        title: place + '. ' + user.user.toUpperCase(),
        color: color,
        thumbnail: {
            url: process.env.DATA_URL + img
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

function nZero(val, place = '0') {
    if (val < 10) return place + val
    else return val
}

function getDuration(milli) {
    let minutes = milli / 60000
    let hours = minutes / 60
    let days = Math.floor(Math.floor(hours) / 24)
    minutes = (hours - Math.floor(hours)) * 60
    hours = Math.floor(hours) - (days * 24)
    return {
        d: nZero(Math.floor(days)),
        h: nZero(Math.floor(hours)),
        m: nZero(Math.floor(minutes))
    }
}