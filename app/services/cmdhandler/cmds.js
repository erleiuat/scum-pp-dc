const http = require("https")
const {
    resolve
} = require("path")

const options = {
    "method": "GET",
    "hostname": "jokeapi-v2.p.rapidapi.com",
    "port": null,
    "path": "/joke/Any?type=single&format=txt&blacklistFlags=racist",
    "headers": {
        "x-rapidapi-key": "b42727cf17msh61c4120c24e955ep1e7dc8jsnd847ba7d1dd3",
        "x-rapidapi-host": "jokeapi-v2.p.rapidapi.com",
        "useQueryString": true
    }
}

async function getJoke() {
    return new Promise(resolve => {
        const req = http.request(options, (res) => {
            const chunks = []
            res.on("data", function (chunk) {
                chunks.push(chunk)
            })
            res.on("end", () => {
                const body = Buffer.concat(chunks)
                resolve(body.toString().replace(/\n/g, " ").replace(/"/gmi, "'"))
            })
        })
        req.end()
    })
}

exports.joke = async function joke(key, cmd) {
    if (cmd.type.toLowerCase() != 'global') return null

    let joke = await getJoke()
    while (joke.length > 200) {
        joke = await getJoke()
    }

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][JOKE]',
            joke,
            '#ClearFakeName'
        ]
    }

    return tmpObj

}

exports.what_is_going_on = async function what_is_going_on(key, cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    //let parts = cmd.message.split(' ').shift()

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][WOT]',
            '...is going on here',
            'BREKFEST',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}

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

    let distance = countDownDate.getTime() - now.getTime()
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

    let tmpObj = {}
    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][RESTART]',
            'Next restart will be in: ' + hours + ' hours and ' + minutes + ' minutes.',
            '#ClearFakeName'
        ]
    }

    return tmpObj

}

exports.starterkitlegal = async function starterkitlegal(key, cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    let tmpObj = {}

    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][STARTERKIT]',
            '@' + cmd.user + ' please go to an open area (e.g. a meadow) in order to avoid problems when receiving your starter kit. Write \'!ready\' when you are there :)',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}

exports.starterkitready = async function starterkitready(key, cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    let tmpObj = {}

    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][STARTERKIT]',
            '@' + cmd.user + ' please stay where you are. Your starterkit will arrive in about 1 minute.',
            '#TeleportTo ' + cmd.steamID,
            '#SpawnItem Backpack_01_07',
            '#SpawnItem MRE_Stew 2',
            '#SpawnItem MRE_CheeseBurger 2',
            '#SpawnItem MRE_TunaSalad 2',
            '#SpawnItem Milk 2',
            '#SpawnItem Canteen 2',
            '#SpawnItem Emergency_Bandage_Big',
            '#SpawnItem Painkillers_03',
            '#SpawnItem Vitamins_03',
            '#SpawnItem BP_Compass_Advanced',
            '#SpawnItem 1H_Small_Axe',
            '#SpawnItem 2H_Baseball_Bat_With_Wire',
            '#SpawnItem Car_Repair_Kit',
            '#SpawnVehicle BP_Quad_01_A',
            '#Teleport -728710 -891680 250',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}

exports.starterkitillegal = async function starterkitillegal(key, cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    let tmpObj = {}

    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][STARTERKIT]',
            '@' + cmd.user + ' you should have already received your starterkit ;) If not, please contact support.',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}

exports.help = async function help(key, cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    let tmpObj = {}

    tmpObj[key] = {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][HELP]',
            'Available commands (only global-chat and if bot is online):',
            '!voteday, !votesun, !online, !restart, !joke, !starterkit',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}


exports.welcome = async function welcome(newUser) {
    let tmpObj = {}

    let key = 'welcome_new_' + newUser.joined.getTime
    tmpObj[key] = {
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][WELCOME]',
            'Welcome to the Server @' + newUser.user + '! If you have any questions, please don\'t hesitate to contact us. You are also entitled to a starterkit! Get it with: !starterkit (in global-chat).',
            '#ClearFakeName'
        ]
    }

    return tmpObj
}


exports.killFeed = async function killFeed(key, cmd) {
    /*
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
    */
}