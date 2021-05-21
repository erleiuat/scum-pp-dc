const fs = require('fs')
const sn = global.chalk.yellow('[LOGProcessor] -> ')
const ftp = new(require('basic-ftp')).Client()
const fileHandler = require('./fileHandler')
//ftp.ftp.verbose = true

exports.start = async function start() {

    await initFiles({
        kill: {},
        chat: {},
        admin: {},
        login: {}
    })

    do {
        await global.sleep.timer(0.01)
        if (!global.updates) continue
        global.updates = false

        let logs = {
            kill: {},
            chat: {},
            admin: {},
            login: {}
        }

        console.log(sn + 'Processing new Data')
        let logCache = await getCurrentCache(logs)

        for (const key in logs) logs[key] = await fileHandler.getLines(key)

        for (const logtype in logs) {
            for (const key in logs[logtype]) {
                if (!(key in logCache[logtype])) {
                    console.log(sn + 'Added new Entry for processing.')
                    global.newEntries[logtype][key] = logs[logtype][key]
                } else delete logs[logtype][key]
            }
        }

        await updateExisting(logCache, logs)

    } while (true)

}

async function updateExisting(cache, updates) {

    console.log(sn + 'Updating Log-Cache')

    for (const key in cache) fs.writeFileSync('./app/storage/logs/' + key + '.json', JSON.stringify({
        ...cache[key],
        ...updates[key]
    }))

    try {

        await ftp.access({
            host: process.env.RM_FTP_HOST,
            port: process.env.RM_FTP_PORT,
            user: process.env.RM_FTP_USER,
            password: process.env.RM_FTP_PASSWORD,
            secure: true
        })

        for (const key in cache) await ftp.uploadFrom('./app/storage/logs/' + key + '.json', process.env.RM_FTP_LOG_DIR + '/' + key + '.json')

    } catch (error) {
        console.log(sn + error)
    }

    ftp.close()

}

async function initFiles(logTypes) {

    console.log(sn + 'Getting Log-Cache')

    try {

        await ftp.access({
            host: process.env.RM_FTP_HOST,
            port: process.env.RM_FTP_PORT,
            user: process.env.RM_FTP_USER,
            password: process.env.RM_FTP_PASSWORD,
            secure: true
        })

        for (const key in logTypes) await ftp.downloadTo('./app/storage/logs/' + key + '.json', process.env.RM_FTP_LOG_DIR + '/' + key + '.json')

    } catch (error) {
        console.log(sn + error)
    }

    ftp.close()
}


async function getCurrentCache(logTypes) {
    let cacheContent = {}
    for (const key in logTypes) cacheContent[key] = JSON.parse(fs.readFileSync('./app/storage/logs/' + key + '.json'))
    return cacheContent
}