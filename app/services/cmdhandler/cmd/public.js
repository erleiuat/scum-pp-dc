const request = require('request')
let lastDone = {}
let actCmds = []

function addMessage(scope, msg) {
    if (actCmds[actCmds.length - 1] && actCmds[actCmds.length - 1]['messages']) {
        actCmds[actCmds.length - 1]['messages'].push({
            scope: scope,
            message: msg
        })
    } else {
        actCmds.push({
            messages: [{
                scope: scope,
                message: msg
            }]
        })
    }
}

function addAction(action, acteurs = true) {
    tmpAct = {}
    tmpAct[action] = acteurs
    actCmds.push({
        actions: tmpAct
    })
}

function begin(cmd, allowScope = 'global') {
    actCmds = []
    if (cmd.type.toLowerCase() != allowScope) return false
    return true
}

function fullCommand(cmd, type = 'global') {
    let fCmd = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: type,
        commands: [...actCmds]
    }
    actCmds = []
    return fCmd
}

function tooEarly(action, waitMins) {
    let now = new Date().getTime()
    let waitMins = waitMins * 60 * 1000
    if (lastDone[action] && lastDone[action] > now - waitMins) {
        let waitFor = round(waitMins - (now - lastDone[action]))
        addMessage('global', 'Sorry, you are too fast. Please wait ' + waitFor + ' minutes.')
    }
    lastDone[action] = now
    return false
}

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
    if (!begin(cmd, 'global')) return null
    if (tooEarly('vote_night', 15)) return fullCommand(cmd)

    addMessage('global', '[VOTING]: Nighttime-Voting begins! (10:00 PM)')
    addMessage('global', '#vote SetTimeOfDay 22')
    return fullCommand(cmd)
}

exports.help = async function help(cmd) {
    if (!begin(cmd, 'global')) return null

    addMessage('global', '[HELP]: Available commands (if bot is online):')
    addMessage('global', '[HELP]: /voteday, /votesun, /online, /restart, /joke, /starterkit, /time')
    addMessage('global', '[HELP]: -> Will only work in GLOBAL Chat! (Press "TAB" to change chatroom)')
    return fullCommand(cmd)
}

exports.joke = async function joke(cmd) {
    if (!begin(cmd, 'global')) return null
    if (tooEarly('joke', 5)) return fullCommand(cmd)

    let joke = await getJoke()
    while (joke.length > 195) joke = await getJoke()
    addMessage('global', '[JOKE]: ' + joke)
    return fullCommand(cmd)
}

exports.what_is_going_on = async function what_is_going_on(cmd) {
    if (!begin(cmd, 'global')) return null
    addMessage('global', '[WOT]: ...is going on here')
    addMessage('global', '[WOT]: BREKFEST')
    return fullCommand(cmd)
}

exports.vote_weather_sun = async function vote_weather_sun(cmd) {
    if (!begin(cmd, 'global')) return null
    if (tooEarly('vote_weather_sun', 5)) return fullCommand(cmd)

    addMessage('global', '[VOTING]: Weather voting begins!')
    addMessage('global', '#vote SetWeather 0')
    return fullCommand(cmd)
}

exports.vote_day = async function vote_day(cmd) {
    if (!begin(cmd, 'global')) return null
    if (tooEarly('vote_day', 5)) return fullCommand(cmd)

    addMessage('global', '[VOTING]: Daytime-Voting begins! (7:00 AM)')
    addMessage('global', '#vote SetTimeOfDay 7')
    return fullCommand(cmd)
}

exports.ping = async function ping(cmd) {
    if (!begin(cmd, 'global')) return null

    addMessage('global', '[BADABONG]: Pong right back at you @' + cmd.user + ' ;)')
    return fullCommand(cmd)
}

exports.online = async function online(cmd) {
    if (!begin(cmd, 'global')) return null

    addMessage('global', '[PLAYERS]: There are currently ' + global.playersOnline + ' Players online.')
    return fullCommand(cmd)
}

exports.time = async function time(cmd) {
    if (!begin(cmd, 'global')) return null

    let time = '<unavailable>'
    if (global.ingameTime) time = global.ingameTime
    addMessage('global', '[TIME]: It is currently about ' + time + '.')
    return fullCommand(cmd)
}

exports.restart_countdown = async function restart_countdown(cmd) {
    if (!begin(cmd, 'global')) return null

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

    addMessage('global', '[RESTART]: Next restart will be in: ' + hours + ' hours and ' + minutes + ' minutes.')
    return fullCommand(cmd)
}