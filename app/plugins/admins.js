const fetch = require('node-fetch')
const sn = global.chalk.cyan('[ADMINS] -> ')

exports.list = async function list() {
    let url = process.env.DATA_URL + 'admin.json'
    return await fetch(url, {
        method: 'Get'
    }).then(res => res.json()).then((json) => {
        return json
    })
}