exports.vote_weather_sun = async function vote_weather_sun(key, cmd) {

    if (cmd.type.toLowerCase() != 'global') return null
    //let parts = cmd.message.split(' ').shift()

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][VOTING]',
            'Weather voting begins!',
            '#vote SetWeather 0',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}


exports.vote_day = async function vote_day(key, cmd) {

    if (cmd.type.toLowerCase() != 'global') return null
    //let parts = cmd.message.split(' ').shift()

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][VOTING]',
            'Time of day voting begins!',
            '#vote SetTimeOfDay 7',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}

exports.ping = async function ping(key, cmd) {

    if (cmd.type.toLowerCase() != 'global') return null
    //let parts = cmd.message.split(' ').shift()

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][BADABONG]',
            'Pong right back at you @' + cmd.user + ' ;)',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}

exports.online = async function online(key, cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    //let parts = cmd.message.split(' ').shift()

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][PLAYERS]',
            'There are currently ' + global.playersOnline + ' Players online.',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}

exports.restart_countdown = async function restart_countdown(key, cmd) {

    if (cmd.type.toLowerCase() != 'global') return null
    let now = new Date()
    let curHour = now.getHours()
    let countDownDate = new Date()
    countDownDate.setMinutes(0)

    if (curHour < 6) countDownDate.setHours(6)
    else if (curHour < 12) countDownDate.setHours(12)
    else if (curHour < 18) countDownDate.setHours(18)
    else if (curHour >= 18) {
        countDownDate.setDate(countDownDate.getDate() + 1)
        countDownDate.setHours(0)
    }

    let distance = countDownDate - now
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][RESTART]',
            'Next restart will be in: ' + hours + 'h ' + minutes + 'm ' + seconds + 's',
            '#ClearFakeName'
        ]
    }

    return tmpObj

}

exports.killFeed = async function killFeed(key, cmd) {

}