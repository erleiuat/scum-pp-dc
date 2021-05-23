const Discord = require('discord.js')
const sn = global.chalk.grey('[STATISTICS] -> ')
const statList = require('./statlist')
const playerstats = require('./playerstats')

const cache = {
    list1: {},
    list2: {},
    list3: {}
}

function formMsgs(listArr) {
    let msgs = []
    let count = 0
    let tmpMsg = ''
    for (let i = 0; i < listArr.length; i++) {
        count++
        tmpMsg += listArr[i]
        if (count >= 10) {
            msgs.push(tmpMsg)
            tmpMsg = ''
            count = 0
        }
    }
    msgs.push(tmpMsg)
    return msgs
}

async function iterateLists(dcClient) {
    let iteration = 1
    let chRanking = dcClient.channels.cache.find(channel => channel.id === process.env.DISCORD_CH_RANKING)
    let chStats = dcClient.channels.cache.find(channel => channel.id === process.env.DISCORD_CH_PLAYERSTATS)

    do {

        await global.sleep.timer(5)
        if (global.updates) continue
        let states = await statList.get()

        let list1 = await playerstats.ranking(states)
        if (JSON.stringify(list1) != JSON.stringify(cache.list1)) {
            await dcSend(list1, chRanking)
            console.log(sn + 'Updated ranking')
            cache.list1 = list1
        }

        let list2 = await playerstats.list(states)
        if (JSON.stringify(list2) != JSON.stringify(cache.list2)) {
            let msgs = formMsgs(list2)
            msgs.push('\n-----\n\n**TOTAL: ' + list2.length + '**')
            await dcSend(msgs, chStats)
            console.log(sn + 'Updated player-stats')
            cache.list2 = list2
        }

        iteration++
    } while (true)
}

async function iterateOnline(dcClient) {
    let channel = dcClient.channels.cache.find(channel => channel.id === process.env.DISCORD_CH_PLAYERONLINE)

    do {
        await global.sleep.timer(1)
        if (global.updates) continue
        let list = await playerstats.online(await statList.get())
        list.push('\n-----\n\n**Currently: ' + list.length + '**\n\n**Highscore: ' + await statList.highscore(list.length) + '**\n')
        if (JSON.stringify(list) != JSON.stringify(cache.list)) {
            await dcSend(formMsgs(list), channel)
            console.log(sn + 'Updated players-online')
            cache.list3 = list
        }
    } while (true)

}

exports.start = async function start(dcClient) {
    iterateLists(dcClient)
    iterateOnline(dcClient)
}

async function dcSend(msgs, channel) {
    await clearChannel(channel)
    for (const msg of msgs) {
        if (msg) await channel.send(msg)
    }
}

async function clearChannel(channel) {
    let fetched
    do {
        fetched = await channel.messages.fetch({
            limit: 100
        })
        if (fetched.size > 0) channel.bulkDelete(fetched)
    } while (fetched.size >= 2)
}