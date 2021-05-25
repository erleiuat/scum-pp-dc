const Discord = require('discord.js')
const sn = global.chalk.grey('[STATISTICS] -> ')
const statList = require('./statlist')
const playerstats = require('./playerstats')
const newPlayers = require('./newplayers')

const cache = {
    list1: {},
    list2: {},
    list3: {},
    list4: {}
}

function formMsgs(listArr) {
    let msgs = []
    let tmpMsg = ''
    for (let i = 0; i < listArr.length; i++) {
        tmpMsg += listArr[i]
        if (tmpMsg.length >= 1800) {
            msgs.push(tmpMsg)
            tmpMsg = ''
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

        var d = new Date()
        d.setDate(d.getDate() - 7)
        let list1 = await playerstats.ranking(await statList.get(d.getTime()))
        if (JSON.stringify(list1) != JSON.stringify(cache.list1)) {
            await dcSend(list1, chRanking)
            console.log(sn + 'Updated ranking')
            cache.list1 = list1
        }

        let list2 = await playerstats.list(await statList.get())
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
    let chOnline = dcClient.channels.cache.find(channel => channel.id === process.env.DISCORD_CH_PLAYERONLINE)

    do {
        await global.sleep.timer(1)
        if (global.updates) continue
        let list = await playerstats.online(await statList.get())
        list.push('\n-----\n\n**Currently: ' + list.length + '**\n\n**Highscore: ' + await statList.highscore(list.length) + '**\n')
        if (JSON.stringify(list) != JSON.stringify(cache.list3)) {
            await dcSend(formMsgs(list), chOnline)
            console.log(sn + 'Updated players-online')
            cache.list3 = list
        }
    } while (true)

}

async function iterateNewPlayers(dcClient) {
    let chNew = dcClient.channels.cache.find(channel => channel.id === process.env.DISCORD_CH_NEWPLAYERS)

    do {

        await global.sleep.timer(10)
        if (global.updates) continue
        let list = await newPlayers.get()
        if (JSON.stringify(list) != JSON.stringify(cache.list4)) {
            await dcSend(list, chNew)
            console.log(sn + 'Updated new-players')
            cache.list4 = list
        }

    } while (true)

}

exports.start = async function start(dcClient) {
    iterateLists(dcClient)
    iterateOnline(dcClient)
    iterateNewPlayers(dcClient)
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