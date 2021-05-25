const fs = require('fs')
const sn = global.chalk.white('[STATISTICS] -> ')

exports.highscore = async function highscore(current) {

    let latest = fs.readFileSync('./app/storage/maxplayers.txt', {
        encoding: 'utf8',
        flag: 'r'
    })

    if (current > parseInt(latest)) {
        fs.writeFileSync('./app/storage/maxplayers.txt', current.toString())
        return current
    }

    return latest

}

exports.get = async function get(startTime = 0) {

    try {
        let state = {}
        let data = JSON.parse(fs.readFileSync('./app/storage/logs/login.json'))
        for (const e in data) {
            let key = data[e].steamID
            let time = formDate(data[e].time).getTime()
            if (time < startTime) continue
            if (!state[key]) state[key] = {
                userID: null,
                user: null,
                ip: null,
                playtime: 0,
                totalLogins: 0,
                lastLogin: null,
                login: false
            }
            if (data[e].type == 'login') {
                state[key].login = time
                state[key].userID = data[e].userID
                state[key].user = data[e].user
                state[key].ip = data[e].ip
                state[key].totalLogins++
                if (!state[key].lastLogin || state[key].lastLogin.getTime() < time)
                    state[key].lastLogin = formDate(data[e].time)
            } else {
                if (state[key].login) {
                    state[key].playtime += time - state[key].login
                    state[key].login = null
                }
            }
        }

        return state

    } catch (error) {
        console.log(sn + 'Error: ' + error)
        return false
    }


}

function formDate(dateStr) {
    let dParts = dateStr.date.split('.')
    return new Date(dParts[2] + '-' + dParts[1] + '-' + dParts[0] + 'T' + dateStr.time)
}