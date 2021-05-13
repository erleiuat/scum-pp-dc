const sn = global.chalk.green('[FTPWatcher] -> ')
const ftp = new(require('basic-ftp')).Client()
//ftp.ftp.verbose = true

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
        console.log(sn + error)
    }

    console.log(sn + 'FTP-Connection established. Starting watcher.')
    let dirSize = 0

    do {
        await global.sleep.timer(1)
        if (global.updates) continue

        console.log(sn + 'Checking for new updates...')
        let files = await ftp.list(process.env.PP_FTP_LOG_DIR)
        let currSize = 0

        for (const file of files)
            currSize += file.size

        if (currSize !== dirSize) {
            console.log(sn + 'New Updates found! Downloading files...')
            await ftp.downloadToDir('./app/storage/raw_logs', process.env.PP_FTP_LOG_DIR)
            dirSize = currSize
            console.log(sn + 'Download complete')
            global.updates = true
        }


    } while (true)

}