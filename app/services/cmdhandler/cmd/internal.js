exports.console_msg = async function console_msg(cmd) {
    let cmdArr = ['#SetFakeName [SF-BOT][' + cmd.user + ']']
    cmdArr = cmdArr.concat(cmd.content.split(';').map(s => s.trim()))
    cmdArr.push('#ClearFakeName')
    return {
        message: 'console_msg',
        commands: cmdArr
    }
}

exports.spawn = async function spawn(cmd) {
    cmd.message = '#Teleport -116077 -66395 37065; ' + cmd.message
    return await this.exec(cmd)
}

exports.mine_armed = async function mine_armed(cmd) {
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][MINE]',
            'If you have just placed a mine, please note that this is only allowed in and immediately around your Base. Remove the mine if this is not the case.',
            '#ClearFakeName'
        ]
    }
}

exports.exec = async function exec(cmd) {
    aList = await global.admins.list()
    if (!cmd.steamID || !aList[cmd.steamID] || !aList[cmd.steamID].canExec) return null
    let message = cmd.message.toLowerCase().replace('!exec', '').trim()
    let command = message.split(' ')[0].toLowerCase().trim()
    if (aList[cmd.steamID].commands[command] || aList[cmd.steamID].commands['#*']) {
        let cmdArr = ['#SetFakeName [SF-BOT][' + cmd.user + '][EXEC]']
        cmdArr = cmdArr.concat(cmd.message.split(';').map(s => s.trim()))
        cmdArr.push('#ClearFakeName')
        return {
            date: cmd.time.date,
            time: cmd.time.time,
            type: 'global',
            commands: cmdArr
        }
    }
    console.log('[PERMISSIONS] -> WARNING: ' + cmd.user + ' has no permissions to execute "' + message + '"')
    return null
}

exports.sk_legal = async function sk_legal(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][STARTERKIT]',
            '@' + cmd.user + ' you will be teleported to the trading-zone (green circle in B2) to receive your starterkit. Make sure you are ready and not driving a vehicle.',
            'You will get a quad to get out of the trading-zone again. If you are ready to be teleported type \'!ready\' ',
            '#ClearFakeName'
        ]
    }
}

exports.sk_ready = async function sk_ready(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][STARTERKIT]',
            '@' + cmd.user + ' you will be transported to the trading zone in a few seconds.',
            '#Teleport -117129 -66713 37065',
            '#TeleportToMe ' + cmd.steamID,
            '#SpawnItem Backpack_01_07',
            '#SpawnItem MRE_Stew 2',
            '#SpawnItem MRE_CheeseBurger 2',
            '#SpawnItem MRE_TunaSalad 2',
            '#SpawnItem Milk 2',
            '#SpawnItem Canteen 2',
            '#SpawnItem Emergency_Bandage_Big',
            '#SpawnItem Painkillers_03',
            '#SpawnItem Vitamins_03',
            '#SpawnItem BP_Compass_Advanced',
            '#SpawnItem 1H_Small_Axe',
            '#SpawnItem 2H_Baseball_Bat_With_Wire',
            '#SpawnItem Car_Repair_Kit',
            '#SpawnItem Lock_Item_Basic',
            '#Teleport -116453 -66401 37477',
            '#SpawnVehicle BP_Quad_01_A',
            '@' + cmd.user + ' your starterkit should now be there any your Quad should be waiting for you outside.',
            '#ClearFakeName'
        ]
    }
}

exports.sk_illegal = async function sk_illegal(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][STARTERKIT]',
            '@' + cmd.user + ' you should have already received your starterkit ;) If not, please contact support.',
            '#ClearFakeName'
        ]
    }
}

exports.welcome_new = async function welcome_new(newUser) {
    return {
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][WELCOME]',
            'Welcome to the Server @' + newUser.user + '! If you have any questions, please don\'t hesitate to contact us. You are also entitled to a starterkit! Get it with: !starterkit (in global-chat).',
            '#ClearFakeName'
        ]
    }
}

exports.auth_log = async function auth_log(cmd) {
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][AUTH]',
            ' >> ' + cmd.user + ' ' + cmd.text + ' << ',
            '#ClearFakeName'
        ]
    }
}

exports.kill_feed = async function kill_feed(cmd) {
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][KILLFEED]',
            cmd.killer + ' killed ' + cmd.victim,
            '#ClearFakeName'
        ]
    }
}