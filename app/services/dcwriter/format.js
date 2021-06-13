const fetch = require('node-fetch')
const sn = global.chalk.cyan('[DCWriter] -> [Format] -> ')
let weaponImg = null

function hasImg(weapon) {
    if (!weapon) return false
    if (weapon.includes('_C')) weapon = weapon.split('_C')[0].replace(/\s/g, '')
    if (weaponImg[weapon]) return process.env.IMG_URL + 'weapon/' + weaponImg[weapon]
}

exports.loadWeapons = async function loadWeapons() {
    let url = process.env.DATA_URL + 'weapon/_weaponlist.json'
    await fetch(url, {
        method: 'Get'
    }).then(res => res.json()).then((json) => {
        weaponImg = json
    })
}

exports.kill = async function kill(entry) {

    let distance = 0
    if (entry.Killer && entry.Killer.ServerLocation.X) {
        var dx = entry.Killer.ServerLocation.X - entry.Victim.ServerLocation.X
        var dy = entry.Killer.ServerLocation.Y - entry.Victim.ServerLocation.Y
        var dz = entry.Killer.ServerLocation.Z - entry.Victim.ServerLocation.Z
        var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2))
        distance = Math.round(dist / 100)
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

    if (distance > 0) msg.fields.push({
        'name': 'Distance',
        'value': distance + ' Meters'
    })

    if (entry.Victim.IsInGameEvent) {
        msg.title = 'Event-Kill'
        msg.color = '00ffff'
    }

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