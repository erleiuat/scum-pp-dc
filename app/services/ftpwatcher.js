const sn = global.chalk.green('[FTPWatcher] -> ')
const ftp = new(require('basic-ftp')).Client()
//ftp.ftp.verbose = true

let accessCounter = 60

async function ftpReconnect() {
    console.log(sn + 'FTP -> Reconnect')
    ftp.close()
    await ftpConnect()
    accessCounter = 0
}

async function ftpConnect() {
    try {
        await ftp.access({
            host: process.env.PP_FTP_HOST,
            port: process.env.PP_FTP_PORT,
            user: process.env.PP_FTP_USER,
            password: process.env.PP_FTP_PASSWORD,
            secure: false
        })
    } catch (error) {
        console.log(sn + error)
    }
    console.log(sn + 'FTP -> Connection established')
}

exports.start = async function start() {
    let fileCache = {}
    let i = 0

    do {
        await global.sleep.timer(1)
        try {
            if (accessCounter >= 30) await ftpReconnect()
        } catch (error) {
            console.log(sn + 'Error while FTP-Reconnect: ' + error)
            continue
        }

        accessCounter++
        if (global.updates) continue
        i++
        console.log(sn + 'Checking for new updates (#' + i + ')')
        let files = await ftp.list(process.env.PP_FTP_LOG_DIR)
        let newFiles = {}

        for (const file of files) {
            if (file.name.startsWith('violations')) continue
            if (fileCache[file.name] && fileCache[file.name].size == file.size) continue
            newFiles[file.name] = file
        }

        if (Object.keys(newFiles).length <= 0) continue
        console.log(sn + 'New Updates found! Downloading files...')
        for (file in newFiles) {
            console.log(sn + 'Downloading ' + file)
            await ftp.downloadTo('./app/storage/raw_logs/new/' + file, process.env.PP_FTP_LOG_DIR + '/' + file)
        }

        console.log(sn + 'Download complete')
        global.updates = true
        fileCache = {
            ...fileCache,
            ...newFiles
        }

    } while (true)

}