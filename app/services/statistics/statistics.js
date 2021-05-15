const Discord = require('discord.js')
const sn = global.chalk.white('[STATISTICS] -> ')
const statList = require('./statlist')
const playerstats = require('./playerstats')

const cache = {
    list1: {},
    list2: {},
    list3: {}
}

async function iterateLists(dcClient) {
    let iteration = 1
    do {
        let states = await statList.get()
        let list1 = await playerstats.ranking(states)
        if (JSON.stringify(list1) != JSON.stringify(cache.list1)) {
            await dcSend(list1, dcClient.channels.cache.find(channel => channel.id === process.env.DISCORD_CH_RANKING))
            cache.list1 = list1
        }
        let list2 = await playerstats.list(states)
        if (JSON.stringify(list2) != JSON.stringify(cache.list2)) {
            await dcSend(list2, dcClient.channels.cache.find(channel => channel.id === process.env.DISCORD_CH_PLAYERSTATS))
            cache.list2 = list2
        }
        console.log(sn + 'Updated (#'+iteration+')')
        iteration++
        await global.sleep.timer(60)
    } while (true)
}

async function iterateOnline(dcClient) {
    do {
        let states = await statList.get()
        let list3 = await playerstats.online(states)
        if (JSON.stringify(list3) != JSON.stringify(cache.list3)) {
            await dcSend(list3, dcClient.channels.cache.find(channel => channel.id === process.env.DISCORD_CH_PLAYERONLINE))
            cache.list3 = list3
        }
        await global.sleep.timer(5)
    } while (true)
}

exports.start = async function start(dcClient) {
    iterateLists(dcClient)
    iterateOnline(dcClient)
}

async function dcSend(msgs, channel) {
    await clearChannel(channel)
    for (const msg of msgs) {
        await channel.send(msg)
    }
}

async function clearChannel(channel) {
    let fetched
    do {
        fetched = await channel.messages.fetch({
            limit: 100
        })
        channel.bulkDelete(fetched)
    } while (fetched.size >= 2)
}