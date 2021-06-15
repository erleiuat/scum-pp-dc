const fetch = require('node-fetch')
const fs = require('fs')
const sn = global.chalk.cyan('[DCWriter] -> [Format] -> ')
let weaponImg = null

function hasImg(weapon) {
    if (!weapon) return false
    if (weapon.includes('_C')) weapon = weapon.split('_C')[0].replace(/\s/g, '')
    if (weaponImg[weapon]) return process.env.DATA_URL + 'weapon/' + weaponImg[weapon]
}

async function findMineOwner(steamID, date, time) {
    await global.sleep.timer(1)
    let data = JSON.parse(fs.readFileSync('./app/storage/logs/mines.json'))
    for (const e in data) {
        if (data[e].action == 'triggered' && data[e].steamID == steamID)
            if (data[e].time.date == date && data[e].time.time == time) return data[e].owner
    }
    return false
}

exports.loadWeapons = async function loadWeapons() {
    let url = process.env.DATA_URL + 'weapon/_weaponlist.json'
    await fetch(url, {
        method: 'Get'
    }).then(res => res.json()).then((json) => {
        weaponImg = json
    })
}

exports.mines = async function mines(entry) {
    let msg = {
        'title': 'MINE-ACTION',
        'color': 'F3EA5F',
        'fields': [{
            'name': 'From',
            'value': entry.user,
            'inline': true
        }, {
            'name': 'SteamID',
            'value': entry.steamID,
            'inline': true
        }, {
            'name': 'Action',
            'value': entry.action,
            'inline': true
        }],
        'footer': {
            'text': entry.time.date + ` - ` + entry.time.time
        }
    }

    if (entry.action == 'triggered') {
        msg.fields.push({
            'name': 'Owner',
            'value': entry.owner.user + '(' + entry.owner.steamID + ')',
        })
    }
    console.log(msg)

    return msg
}

exports.kill = async function kill(entry) {

    if (entry.Killer.ProfileName.toLowerCase() == 'unknown') {
        let mineOwner = await findMineOwner(entry.Victim.UserId, entry.time.date, entry.time.time)
        if (mineOwner) {
            entry.Killer.ProfileName = mineOwner.user
            entry.Killer.UserId = mineOwner.steamID
        }
    }

    let msg = {
        'color': 'ff0000',
        'fields': [{
                'name': 'Killer',
                'value': entry.Killer.ProfileName,
                'inline': true
            },
            {
                'name': 'Victim',
                'value': entry.Victim.ProfileName,
                'inline': true
            },
            {
                'name': 'Weapon',
                'value': entry.Weapon
            }
        ],
        'footer': {
            'text': entry.time.date + ` - ` + entry.time.time
        }
    }

    let img = hasImg(entry.Weapon)
    if (img) msg.thumbnail = {
        url: img
    }

    if (entry.distance > 0) msg.fields.push({
        'name': 'Distance',
        'value': entry.distance + ' Meters'
    })

    if (entry.Victim.IsInGameEvent) {
        msg.title = 'Event-Kill'
        msg.color = '00ffff'
    }

    console.log(msg)
    return msg

}

exports.chat = async function chat(entry) {
    return {
        'color': '000000',
        'fields': [{
            'name': entry.user,
            'value': entry.message
        }],
        'footer': {
            'text': entry.time.date + ` - ` + entry.time.time
        }
    }
}

exports.admin = async function admin(entry) {
    return {
        'color': '000000',
        'fields': [{
            'name': entry.user,
            'value': entry.message
        }],
        'footer': {
            'text': entry.time.date + ` - ` + entry.time.time
        }
    }
}

exports.login = async function login(entry) {
    let msg = {
        'fields': [{
            'name': 'ID',
            'value': entry.userID,
            'inline': true
        }, {
            'name': 'IP',
            'value': entry.ip,
            'inline': true
        }, {
            'name': 'SteamID',
            'value': entry.steamID,
            'inline': true
        }],
        'footer': {
            'text': entry.time.date + ` - ` + entry.time.time
        }
    }

    if (entry.type == 'logout') return {
        'color': 'FF0000',
        'title': 'Logout -> ' + entry.user,
        ...msg
    }

    return {
        'color': 'FFFF00',
        'title': 'Login -> ' + entry.user,
        ...msg
    }

}