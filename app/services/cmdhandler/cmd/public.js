const request = require('request')

exports.list = {
    '/voteday': 'vote_day',
    '/dayvote': 'vote_day',
    '/votenight': 'vote_night',
    '/votesun': 'vote_weather_sun',
    '/sunvote': 'vote_weather_sun',
    '/voteweather': 'vote_weather_sun',
    '/weathervote': 'vote_weather_sun',
    '/ping': 'ping',
    '/pong': 'ping',
    '/online': 'online',
    '/players': 'online',
    '/playersonline': 'online',
    '/onlineplayers': 'online',
    '/whenrestart': 'restart_countdown',
    '/restart': 'restart_countdown',
    '/restartwhen': 'restart_countdown',
    '/help': 'help',
    '/commands': 'help',
    '/joke': 'joke',
    '/time': 'time',
    '/what': 'what_is_going_on'
}

async function getJoke() {
    return new Promise(resolve => {
        request.get({
            url: 'https://api.api-ninjas.com/v1/jokes?limit=1',
            headers: {
                'X-Api-Key': '7wk74FwsQHrQj9A6JgE1FA==5uxpvXNNabi4lflP'
            },
        }, (error, response, body) => {
            if (error) return console.error('Request failed:', error)
            else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'))
            else resolve(JSON.parse(body)[0]['joke'])
        })
    })
}

exports.vote_night = async function vote_night(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[VOTING]: Nighttime-Voting begins! (10:00 PM)'},
                    {scope: 'global', message: '#vote SetTimeOfDay 22'},
                ]
            }
        ]
    }
}

exports.help = async function help(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[HELP]: Available commands (if bot is online):'},
                    {scope: 'global', message: '[HELP]: /voteday, /votesun, /online, /restart, /joke, /starterkit, /time'},
                    {scope: 'global', message: '[HELP]: -> Will only work in GLOBAL Chat! (Press "TAB" to change chatroom)'}
                ]
            }
        ]
    }
}

exports.joke = async function joke(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    let joke = await getJoke()
    while (joke.length > 200) joke = await getJoke()
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[JOKE]: ' + joke}
                ]
            }
        ]
    }
}

exports.what_is_going_on = async function what_is_going_on(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[WOT]: ...is going on here'},
                    {scope: 'global', message: '[WOT]: BREKFEST'}
                ]
            }
        ]
    }
}

exports.vote_weather_sun = async function vote_weather_sun(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[VOTING]: Weather voting begins!'},
                    {scope: 'global', message: '#vote SetWeather 0'}
                ]
            }
        ]
    }
}

exports.vote_day = async function vote_day(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[VOTING]: Daytime-Voting begins! (7:00 AM)'},
                    {scope: 'global', message: '#vote SetTimeOfDay 7'}
                ]
            }
        ]
    }
}

exports.ping = async function ping(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[BADABONG]: Pong right back at you @' + cmd.user + ' ;)'}
                ]
            }
        ]
    }
}

exports.online = async function online(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[PLAYERS]: There are currently ' + global.playersOnline + ' Players online.'}
                ]
            }
        ]
    }
}

exports.time = async function time(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    let time = '<unavailable>'
    if(global.ingameTime) time = global.ingameTime
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[TIME]: It is currently about ' +  time  + '. '}
                ]
            }
        ]
    }
}

exports.restart_countdown = async function restart_countdown(cmd) {
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

    let distance = countDownDate.getTime() - now.getTime()
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[RESTART]: Next restart will be in: ' + hours + ' hours and ' + minutes + ' minutes.'}
                ]
            }
        ]
    }
}