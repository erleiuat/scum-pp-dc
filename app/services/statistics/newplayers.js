const fs = require('fs')
const sn = global.chalk.white('[STATISTICS] -> ')

exports.get = async function get() {

    let data = JSON.parse(fs.readFileSync('./app/storage/logs/login.json'))
    let state = {}

    for (const e in data) {

        let key = data[e].steamID
        let time = formDate(data[e].time)

        if (!state[key]) state[key] = {
            user: data[e].user,
            joined: time,
            date: time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear()
        }
        else {
            if (state[key].joined.getTime() > time.getTime()) {
                state[key].joined = time
                state[key].date = time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear()
            }
        }

    }

    let stateArr = []
    for (const e in state) {
        stateArr.push(state[e])
    }

    return await formMsg(stateArr)

}

async function formMsg(state) {

    let msgs = []
    state.sort((a, b) => (a.joined.getTime() > b.joined.getTime()) ? 1 : ((b.joined.getTime() > a.joined.getTime()) ? -1 : 0))

    let msg = ''
    let curDate = ''
    let countUsers = 0
    for (const user of state) {

        if (msg.length >= 1500) {
            msgs.push(msg)
            msg = ''
        }

        if (curDate != user.date) {
            msg += '\n**Total: ' + countUsers + '**\n\n-----\n\n**New Users from ' + user.date + ':**'
            curDate = user.date
            countUsers = 0
        }

        msg += '\n - ' + user.user
        countUsers++

    }

    msg += '\n**Total: ' + countUsers + '**\n\n-----'
    msgs.push(msg)
    return msgs

}

function formDate(dateStr) {
    let dParts = dateStr.date.split('.')
    return new Date(dParts[2] + '-' + dParts[1] + '-' + dParts[0] + 'T' + dateStr.time)
}