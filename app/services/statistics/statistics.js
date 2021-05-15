const fs = require('fs')
const Discord = require('discord.js')
const sn = global.chalk.white('[STATISTICS] -> ')

const admins = [
    '76561198058320009',
    '76561198082374095',
    '76561198907112461',
    '76561199166410611',
    '76561198046659274'
]


exports.start = async function start(dcClient) {

    do {

        let states = await getStates()


        global.sleep.timer(5)

    } while (false)

}

async function getStates() {

    try {
        let data = JSON.parse(fs.readFileSync('./app/storage/logs/login.json'))
        console.log(data)
    } catch (error) {
        console.log(sn + 'Error: ' + error)
        return false
    }


}