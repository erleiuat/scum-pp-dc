exports.console_msg = async function console_msg(cmd) {
    return {
        message: 'console_msg',
        commands: [
            '#SetFakeName [SF-BOT][' + cmd.user + ']',
            cmd.content,
            '#ClearFakeName'
        ]
    }
}

let admins = [
    '76561198058320009',
    '76561198082374095',
    '76561198046659274'
]

exports.spawn = async function spawn(cmd) {
    if (!cmd.steamID) return null
    if (!admins.includes(cmd.steamID)) return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][EXEC]',
            '#Teleport -116077 -66395 37065',
            cmd.message.toLowerCase().replace('!spawn', '').trim(),
            '#Teleport -117129 -66713 37065',
            '#ClearFakeName'
        ]
    }
}

exports.exec = async function exec(cmd) {
    if (!cmd.steamID) return null
    if (!admins.includes(cmd.steamID)) return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][EXEC]',
            cmd.message.toLowerCase().replace('!exec', '').trim(),
            '#ClearFakeName'
        ]
    }
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
            '@' + cmd.user + ' you will be transported to the trading zone now.',
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
            '#Teleport -117129 -66713 37065',
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