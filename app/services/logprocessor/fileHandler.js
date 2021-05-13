const fs = require('fs')
const iconv = require('iconv-lite')
const regexname = /\(([^)]+)\).*/gm
const sn = global.chalk.yellow('[LOGProcessor] -> ')

exports.getLines = async function getLines(type) {

    let files = fs.readdirSync('./app/storage/raw_logs/')
    let lines = {}

    for (const file of files) {
        if (file.startsWith(type)) {
            if (type == 'kill') lines = {
                ...lines,
                ...await kill(file)
            }
            else if (type == 'chat') lines = {
                ...lines,
                ...await chat(file)
            }
            else if (type == 'admin') lines = {
                ...lines,
                ...await admin(file)
            }
            else if (type == 'login') lines = {
                ...lines,
                ...await login(file)
            }
            /*
            else if (type == 'violations') lines = {
                ...lines,
                ...await violations(file)
            }
            */
            else return false
        }
    }

    return lines

}

async function chat(file) {
    let content = await getContent(file)
    let lines = await formLines(content)
    let formatted = {}

    for (const line of lines) {
        let t = formTime(line)
        let steamID = line.substring(22, 39)
        let key = formKey(t, steamID)
        let msg = line.substring(line.indexOf('\' \'') + 1).slice(2, -1)
        let msgType = msg.slice(0, msg.indexOf(':'))
        msg = msg.substring(msg.indexOf(':') + 1)
        let userID = line.slice(40).match(regexname)
        let user = line.slice(40).replace(userID, '')

        formatted[key] = {
            time: t,
            user: user,
            steamID: steamID,
            type: msgType,
            message: msg
        }

    }

    return formatted
}

async function admin(file) {
    let content = await getContent(file)
    let lines = await formLines(content)
    let formatted = {}

    for (const line of lines) {
        let t = formTime(line)
        let steamID = line.substring(22, 39)
        let key = formKey(t, steamID)
        let msg = line.substring(line.indexOf('\' C')).slice(2, -1)
        let msgType = msg.slice(0, msg.indexOf(':'))
        msg = '#' + msg.substring(msg.indexOf(': \'') + 3)
        let userID = line.slice(40).match(regexname)
        let user = line.slice(40).replace(userID, '')

        formatted[key] = {
            time: t,
            user: user,
            steamID: steamID,
            type: msgType,
            message: msg
        }

    }

    return formatted
}

async function login(file) {
    let content = await getContent(file)
    let lines = await formLines(content)
    let formatted = {}

    for (const line of lines) {
        let t = formTime(line)

        if (line.includes('logged in')) {

            let ip = line.slice(22, line.substring(22).indexOf(' ') + 22)
            let steamID = line.slice(line.indexOf(ip) + ip.length +1, line.indexOf(ip) + ip.length + 17)
            let userID = line.substring(line.indexOf(ip) + ip.length + 19).match(regexname)
            let user = line.substring(line.indexOf(ip) + ip.length + 19).replace(userID, '')
            userID = userID[0].slice(userID[0].indexOf('(') + 1, userID[0].indexOf(')'))
            let key = formKey(t, userID)
            
            formatted[key] = {
                type: 'login',
                steamID: steamID,
                userID: userID,
                user: user,
                time: t,
                ip: ip
            }

        } else {

            let userID = line.slice(22, line.indexOf('\' logging out'))
            let key = formKey(t, userID)
            formatted[key] = {
                type: 'logout',
                steamID: null,
                userID: userID,
                user: null,
                time: t,
                ip: null
            }

        }

    }

    return formatted
}

async function kill(file) {
    let content = await getContent(file)
    let lines = await formLines(content)
    let formatted = {}

    for (const line of lines) {
        if (!line.slice(21, 30).startsWith('{')) continue
        let t = formTime(line)
        let content = JSON.parse(line.slice(21))
        let key = formKey(t, content.Victim.UserId)
        content.time = t
        formatted[key] = content
    }

    return formatted
}

async function getContent(file) {
    let content = fs.readFileSync('./app/storage/raw_logs/' + file)
    return iconv.decode(new Buffer.from(content), 'utf16le')
}

async function formLines(content) {
    let lines = []
    let tmpLines = content.split(/\r?\n/)
    for (const line of tmpLines) {
        if (line.length < 5) continue
        if (line.slice(20, 35).includes('Game version')) continue
        lines.push(line)
    }
    return lines
}

function nZero(val) {
    if (val < 10) return '0' + val
    else return val
}

function formTime(line) {
    let date = line.substring(0, 10).replace(/\./g, '-')
    let time = line.substring(11, 19).replace(/\./g, ':')
    let d = new Date(date + 'T' + time)
    d.setHours(d.getHours() + 2)
    return {
        date: nZero(d.getDate()) + '.' + nZero((d.getMonth() + 1)) + '.' + d.getFullYear(),
        time: nZero(d.getHours()) + ':' + nZero(d.getMinutes()) + ':' + nZero(d.getSeconds())
    }
}

function formKey(t, id) {
    return ((t.date).replace(/\./g, '_') + '.' + (t.time).replace(/\:/g, '_') + '.' + id).replace(/\s/g, '')
}

/*
async function violations(file) {
    let content = await getContent(file)
    let lines = await formLines(content)
    let formatted = {}
    for (const line of lines) {
        if (!line.slice(21, 30).startsWith('{')) continue
        let t = formTime(line)
        let content = JSON.parse(line.slice(21))
        let key = formKey(t, content.Victim.UserId)
        content.time = t
        formatted[key] = content
    }
    return formatted
}
*/