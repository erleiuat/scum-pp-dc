const sn = global.chalk.green('[FTPWatcher] -> ')
const ftp = new(require('basic-ftp')).Client()
const ioCheckSec = global.io.meter({
    name: 'FTP-Checks/Second',
    id: 'app/services/ftpwatcher/checks/volume'
})
const ioTotalReq = io.counter({
    name: 'FTP-Request Total',
    id: 'app/services/ftpwatcher/requests/total'
});

exports.start = async function start() {

    try {
        await ftp.access({
            host: process.env.PP_FTP_HOST,
            port: process.env.PP_FTP_PORT,
            user: process.env.PP_FTP_USER,
            password: process.env.PP_FTP_PASSWORD,
            secure: false
        })
    } catch (error) {
        throw new Error(error)
    }

    console.log(sn + 'FTP-Connection established')
    let fileCache = {}
    let listCache = ''
    let i = 0

    do {
        await global.sleep.timer(0.01)
        if (global.updates) continue

        i++
        console.log(sn + 'Checking for new updates (#' + i + ')')
        let files = await ftp.list(process.env.PP_FTP_LOG_DIR)
        ioTotalReq.inc()
        ioCheckSec.mark()

        if (JSON.stringify(files) == listCache) continue
        listCache = JSON.stringify(files)

        let newFiles = {}
        for (const file of files) {
            if (file.name.startsWith('violations')) continue
            if (fileCache[file.name] && fileCache[file.name].size == file.size) continue
            newFiles[file.name] = file
        }

        if (Object.keys(newFiles).length <= 0) continue
        console.log(sn + 'New Updates found! Downloading files...')

        for (file in newFiles) {
            await ftp.downloadTo('./app/storage/raw_logs/new/' + file, process.env.PP_FTP_LOG_DIR + '/' + file)
            ioTotalReq.inc()
        }

        global.updates = true
        console.log(sn + 'File-Download complete!')
        fileCache = {
            ...fileCache,
            ...newFiles
        }

    } while (true)

}