const request = require('request')
const sn = global.chalk.grey('[State] -> ')

exports.start = async function start(dcClient) {
    let iteration = 1
    do {
        request({
            'url': process.env.BATTLEMETRICS_URL
        }, (error, response) => {
            if (error) console.log(sn + 'Error: ' + error)
            else {
                try {
                    let data = (JSON.parse(response.body))
                    if (data.data) {
                        data = data.data.attributes
                        dcClient.user.setActivity(
                            data.players + ' 👥 | ' + data.details.time.slice(0, -3) + ' 🕒', {
                                type: 'WATCHING'
                            }
                        )
                        console.log(sn + 'State updated (#' + iteration + ')')
                        iteration++
                    } else {
                        console.log(sn + 'Unable to read Server-Status')
                        dcClient.user.setActivity('-', {
                            type: 'WATCHING'
                        })
                    }
                } catch (e) {
                    console.log(sn + 'Unable to read Server-Status')
                }
            }
        })
        await global.sleep.timer(30)
    } while (true)
}