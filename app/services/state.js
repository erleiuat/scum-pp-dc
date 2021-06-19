const request = require('request')
const sn = global.chalk.green('[State] -> ')

let online = 0
let serverTime = false

/*
async function checkOnline() {
    do {
        await global.sleep.timer(1)
        if (global.updates) continue
        let tmpOnline = 0
        for (const e in global.playerlist) {
            if (global.playerlist[e].online) tmpOnline++
        }
        online = tmpOnline
    } while (true)
}
*/

async function checkTime() {
    let timeCache = ''
    do {
        request({
            'url': process.env.BATTLEMETRICS_URL
        }, (error, response) => {
            if (error) console.log(sn + 'Error: ' + error)
            else {
                try {
                    let data = (JSON.parse(response.body))
                    if (data.data && timeCache != data.data.attributes.details.time) {

                        // Load from Battlemetrics
                        global.playersOnline = data.data.attributes.players
                        timeCache = data.data.attributes.details.time
                        serverTime = data.data.attributes.details.time
                        console.log(sn + 'Server-time updated')
                    }
                } catch (e) {
                    serverTime = false
                    console.log(sn + 'Unable to read Server-Status: ' + e)
                }
            }
        })
        await global.sleep.timer(60)
    } while (true)
}

function nZero(val) {
    if (val == 0) return '00'
    if (val < 10) return '0' + val
    else return val
}

async function incrementTime() {
    do {
        await global.sleep.timer(1 / process.env.GS_TIMEOFDAYSPEED)
        if (!serverTime) continue
        let parts = serverTime.split(':')
        parts[2] = parseInt(parts[2]) + 1

        if (parts[2] >= 60) {
            parts[1] = parseInt(parts[1]) + 1
            parts[2] = 0
        }
        if (parseInt(parts[1]) >= 60) {
            parts[0] = parseInt(parts[0]) + 1
            parts[1] = 0
        }
        if (parseInt(parts[0]) >= 24) parts[0] = 0
        serverTime = nZero(parseInt(parts[0])) + ':' + nZero(parseInt(parts[1])) + ':' + nZero(parseInt(parts[2]))
    } while (true)
}

exports.start = async function start(dcClient) {

    //checkOnline()
    checkTime()
    incrementTime()
    let msgCache = ''

    do {
        await global.sleep.timer(1)
        if (global.updates) continue
        if (global.updatingFTP) continue

        global.ingameTime = serverTime.slice(0, -3)
        let msg = global.playersOnline + ' 👥'
        if (serverTime) msg += ' | ' + serverTime.slice(0, -3) + ' 🕒'
        if (msg == msgCache) continue
        dcClient.user.setActivity(msg, {
            type: 'WATCHING'
        })
        msgCache = msg
    } while (true)

}