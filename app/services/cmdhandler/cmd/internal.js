const cmdBuilder = require('../cmdbuilder')

exports.console_msg = async function console_msg(cmd) {
    cmdBuilder.begin()
    let tmpCmd = cmdBuilder.getTmpCmd()

    cmdBuilder.addMessage('global', '#SetFakeName ' + cmd.user)
    let cmds = cmd.content.split(';')
    for (const cmd of cmds) cmdBuilder.addMessage('global', cmd.trim())
    cmdBuilder.addMessage('global', '#SetFakeName [SF-BOT]')

    return cmdBuilder.fullCommand(tmpCmd)
}

exports.mine_armed = async function mine_armed(cmd) {
    cmdBuilder.begin()
    let tmpCmd = cmdBuilder.getTmpCmd()
    cmdBuilder.addMessage('global', '[MINE]: If you have just placed a mine, please note that this is only allowed in and immediately around your Base. Remove the mine if this is not the case.')
    return cmdBuilder.fullCommand(tmpCmd)
}

exports.spawn = async function spawn(cmd) {
    cmd.message = '#Teleport -116077 -66395 37065; ' + cmd.message.replace('!spawn', '').trim()
    return await this.exec(cmd)
}

exports.exec = async function exec(cmd) {
    aList = await global.admins.list()
    if (!cmd.steamID || !aList[cmd.steamID]) return null

    cmdBuilder.begin()
    let tmpCmd = cmdBuilder.getTmpCmd()
    cmdBuilder.addMessage('global', '#SetFakeName ' + cmd.user)

    let msgCmds = cmd.message.toLowerCase().replace('!exec', '').trim().split(';').map(s => s.trim())
    for (const el of msgCmds) {
        let command = el.split(' ')[0].toLowerCase().trim()
        if (aList[cmd.steamID].canExecute[command] || aList[cmd.steamID].canExecute['#*']) cmdBuilder.addMessage('global', el)
    }

    cmdBuilder.addMessage('global', '#SetFakeName [SF-BOT]')
    cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
    cmdBuilder.addAction('idle')
    return cmdBuilder.fullCommand(tmpCmd)
}

exports.sk_legal = async function sk_legal(cmd) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[STARTERKIT]: @' + cmd.user + ' you will be teleported to the trading-zone (green circle in B2) to receive your starterkit. Make sure you are ready and not driving a vehicle.'},
                    {scope: 'global', message: '[STARTERKIT]: You will get a quad to get out of the trading-zone again. If you are ready to be teleported type \'!ready\' '}
                ]
            }
        ]
        
    }
}

exports.sk_ready = async function sk_ready(cmd, updateFunction) {
    if (cmd.type.toLowerCase() != 'global') return null
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[STARTERKIT]: @' + cmd.user + ' you will be transported to the trading zone in a few seconds.'},
                    {scope: 'local', message: '#Teleport -117129 -66713 37065'},
                    {scope: 'local', message: '#TeleportToMe ' + cmd.steamID},
                    {scope: 'local', message: '#SpawnItem Backpack_01_07'},
                    {scope: 'local', message: '#SpawnItem MRE_Stew 2'},
                    {scope: 'local', message: '#SpawnItem MRE_CheeseBurger 2'},
                    {scope: 'local', message: '#SpawnItem MRE_TunaSalad 2'},
                    {scope: 'local', message: '#SpawnItem Milk 2'},
                    {scope: 'local', message: '#SpawnItem Canteen 2'},
                    {scope: 'local', message: '#SpawnItem Emergency_Bandage_Big'},
                    {scope: 'local', message: '#SpawnItem Painkillers_03'},
                    {scope: 'local', message: '#SpawnItem Vitamins_03'},
                    {scope: 'local', message: '#SpawnItem BP_Compass_Advanced'},
                    {scope: 'local', message: '#SpawnItem 1H_Small_Axe'},
                    {scope: 'local', message: '#SpawnItem 2H_Baseball_Bat_With_Wire'},
                    {scope: 'local', message: '#SpawnItem Car_Repair_Kit'},
                    {scope: 'local', message: '#SpawnItem Lock_Item_Basic'},
                    {scope: 'local', message: '#SpawnItem Lock_Item_Advanced'},
                    {scope: 'local', message: '#Teleport -116453 -66401 37477'},
                    {scope: 'local', message: '#SpawnVehicle BP_Quad_01_A'},
                    {scope: 'local', message: '[STARTERKIT]: @' + cmd.user + ' your starterkit should now be there any your Quad should be waiting for you outside.'},
                    {scope: 'local', message: '#Teleport -116369 -65906 37144'}
                ]
            },
            {
                actions: {
                    idle: true
                }
            },
            {
                function: updateFunction
            }
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
            {
                messages: [
                    {scope: 'global', message: '[STARTERKIT]: @' + cmd.user + ' you should have already received your starterkit ;) If not, please contact support.'},
                ]
            }
        ]
    }
}

exports.welcome_new = async function welcome_new(newUser) {
    return {
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[WELCOME]: Welcome to the Server @' + newUser.user + '! If you have any questions, please don\'t hesitate to contact us. You are also entitled to a starterkit! Get it with: !starterkit (in global-chat).'}
                ]
            }
        ]
    }
}

exports.auth_log = async function auth_log(cmd) {
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[AUTH]:  >> ' + cmd.user + ' ' + cmd.text + ' << '}
                ]
            }
        ]
    }
}

exports.kill_feed = async function kill_feed(cmd) {
    return {
        date: cmd.time.date,
        time: cmd.time.time,
        type: 'global',
        commands: [
            {
                messages: [
                    {scope: 'global', message: '[KILLFEED]: ' + cmd.killer + ' killed ' + cmd.victim}
                ]
            }
        ]
    }
}