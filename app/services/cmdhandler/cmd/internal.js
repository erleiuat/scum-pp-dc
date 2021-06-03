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

exports.sk_legal = async function sk_legal(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][STARTERKIT]',
            '@' + cmd.user + ' please go to an open area (e.g. a meadow) in order to avoid problems when receiving your starter kit. Write \'!ready\' when you are there :)',
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
            '@' + cmd.user + ' please stay where you are. Your starterkit will arrive in about 1 minute.',
            '#TeleportTo ' + cmd.steamID,
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
            '#SpawnVehicle BP_Quad_01_A',
            '@' + cmd.user + ' your starterkit should now be there. If not, please contact an admin.',
            '#Teleport -728710 -891680 250',
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

exports.kill_feed = async function kill_feed(cmd) {
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            '#SetFakeName [SF-BOT][KILLFEED]',
            cmd.time.time + ': [' + cmd.killer + '] killed [' + cmd.victim + ']',
            '#ClearFakeName'
        ]
    }
}