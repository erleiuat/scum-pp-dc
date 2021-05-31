exports.vote_weather_sun = async function vote_weather_sun(key, cmd) {

    if (cmd.type.toLowerCase() != 'global') return null
    let parts = cmd.message.split(' ').shift()

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            'Weather voting begins!',
            '#vote SetWeather 0'
        ]
    }

    return tmpObj
}


exports.vote_day = async function vote_day(key, cmd) {

    if (cmd.type.toLowerCase() != 'global') return null
    let parts = cmd.message.split(' ').shift()

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            'Time of day voting begins!',
            '#vote SetTimeOfDay 7'
        ]
    }

    return tmpObj
}

exports.ping = async function ping(key, cmd) {

    let parts = cmd.message.split(' ').shift()

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: cmd.type.toLowerCase(),
        commands: [
            'Pong right back at you @' + cmd.user + ' ;)'
        ]
    }

    return tmpObj
}