exports.doAct = async function doAct(action) {

    let commands = []
    switch(action) {

        case 'startup':
            commands.push({messages: [{scope:'global', message: 'I will be unavailable for a minute.'}]})
            commands.push({actions: {repair: [
                '#Teleport -117564.797 -67794.680 36809.430',
                '#Teleport -107551.336 -67783.750 36857.059'
            ]}})
            commands.push({messages: [{scope:'global', message: '#Teleport -117331 -66059 37065'}]})
            commands.push({actions: {piss: true}})
            commands.push({actions: {shit: true}})
            commands.push({actions: {shit: true}})
            global.commands = {}
            commands.push({messages: [
                {scope:'global', message: '#Teleport -116369 -65906 37144'},
                {scope:'global', message: 'I\'m available again.'}
            ]})
            commands.push({actions: {idle: true}})
            break

        case 'business':
            commands.push({messages: [
                {scope:'global', message: 'I will be unavailable for a minute.'},
                {scope:'global', message: '#Teleport -117331 -66059 37065'}
            ]})
            commands.push({actions: {piss: true}})
            commands.push({actions: {shit: true}})
            commands.push({messages: [
                {scope:'global', message: '#Teleport -116369 -65906 37144'},
                {scope:'global', message: 'I\'m available again.'}
            ]})
            commands.push({actions: {idle: true}})
            break


        case 'shit':
            commands.push({messages: [
                {scope:'global', message: 'I will be unavailable for a minute.'},
                {scope:'global', message: '#Teleport -117331 -66059 37065'}
            ]})
            commands.push({actions: {shit: true}})
            commands.push({messages: [
                {scope:'global', message: '#Teleport -116369 -65906 37144'},
                {scope:'global', message: 'I\'m available again.'}
            ]})
            commands.push({actions: {idle: true}})
            break

        case 'piss':
            commands.push({messages: [
                {scope:'global', message: 'I will be unavailable for a minute.'},
                {scope:'global', message: '#Teleport -117331 -66059 37065'}
            ]})
            commands.push({actions: {piss: true}})
            commands.push({messages: [
                {scope:'global', message: '#Teleport -116369 -65906 37144'},
                {scope:'global', message: 'I\'m available again.'}
            ]})
            commands.push({actions: {idle: true}})
            break

        case 'dress':
            commands.push({messages: [
                {scope:'global', message: 'I will be unavailable for a minute.'},
                {scope:'global', message: '#Teleport -117331 -66059 37065'}
            ]})
            commands.push({actions: {dress: true}})
            global.commands = {}
            commands.push({messages: [
                {scope:'global', message: '#Teleport -116369 -65906 37144'},
                {scope:'global', message: 'I\'m available again.'}
            ]})
            commands.push({actions: {idle: true}})
            break

        case 'repair':
            commands.push({messages: [{scope:'global', message: 'I will be unavailable for a minute.'}]})
            commands.push({actions: {repair: [
                '#Teleport -117564.797 -67794.680 36809.430',
                '#Teleport -107551.336 -67783.750 36857.059'
            ]}})
            global.commands = {}
            commands.push({messages: [
                {scope:'global', message: '#Teleport -116369 -65906 37144'},
                {scope:'global', message: 'I\'m available again.'}
            ]})
            commands.push({actions: {idle: true}})
            break

        case 'light':
            commands.push({messages: [{scope:'global', message: 'I will be unavailable for 5 minutes.'}]})
            commands.push({actions: {light: [
                '#Teleport -116806 -65842 37065',
                '#Teleport -117327 -66464 37064',
                '#Teleport -117317 -66969 37064',
                '#Teleport -116304 -65755 37064',
                '#Teleport -116184 -66292 37065',
                '#Teleport -116137 -66740 37065',
                '#Teleport -116298 -67044 37064',
                '#Teleport -113569 -66546 36994',
                '#Teleport -113786 -67711 36987',
                '#Teleport -111791 -68827 36999',
                '#Teleport -111650 -67672 36998',
                '#Teleport -111521 -66752 36999',
                '#Teleport -110207 -66393 37023',
                '#Teleport -111963 -63041 37290',
                '#Teleport -110792 -63462 37263',
                '#Teleport -112727 -71093 36757',
                '#Teleport -112653 -72299 36621',
                '#Teleport -111485 -72208 36588'
            ]}})
            global.commands = {}
            commands.push({messages: [
                {scope:'global', message: '#Teleport -116369 -65906 37144'},
                {scope:'global', message: 'I\'m available again.'}
            ]})
            commands.push({actions: {idle: true}})
            break

        default:
            let actions = {}
            actions[action] = true
            commands.push({actions: actions})
            break

    }

    return {
        commands: commands
    }
    
}