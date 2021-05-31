exports.vote_weather_sun = async function vote_weather_sun(key, cmd) {

    if (cmd.type.toLowerCase() != 'global') return null
    let parts = cmd.message.split(' ').shift()

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
    let parts = cmd.message.split(' ').shift()

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
    let parts = cmd.message.split(' ').shift()

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
    let parts = cmd.message.split(' ').shift()

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

exports.killFeed = async function killFeed(key, cmd) {
    
}