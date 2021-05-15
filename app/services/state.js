const request = require('request')
const sn = global.chalk.grey('[State] -> ')

let online = 0
let serverTime = false

async function checkOnline() {
    do {
        await global.sleep.timer(1)
        let tmpOnline = 0
        for (const e in global.playerlist) {
            if (global.playerlist[e].online) tmpOnline++
        }
        online = tmpOnline
    } while (true)
}

async function checkTime() {
    do {
        request({
            'url': process.env.BATTLEMETRICS_URL
        }, (error, response) => {
            if (error) console.log(sn + 'Error: ' + error)
            else {
                try {
                    let data = (JSON.parse(response.body))
                    if (data.data) serverTime = data.data.attributes.details.time.slice(0, -3)
                    else console.log(sn + 'Unable to read Server-Status')
                } catch (e) {
                    console.log(sn + 'Unable to read Server-Status')
                }
            }
        })
        await global.sleep.timer(30)
    } while (true)
}


exports.start = async function start(dcClient) {

    checkOnline()
    checkTime()

    let iteration = 0
    do {
        await global.sleep.timer(5)
        let msg = online + ' 👥'
        if (serverTime) msg += ' | ' + serverTime + ' 🕒'
        dcClient.user.setActivity(msg, {
            type: 'WATCHING'
        })
        console.log(sn + 'State updated (#' + iteration + ')')
        iteration++
    } while (true)

}