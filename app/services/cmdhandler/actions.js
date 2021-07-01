let lastDone = {}
let actCmds = []

function addMessage(scope, msg) {
    actCmds.push({
        messages: [{
            scope: scope,
            message: msg
        }]
    })
}

function addAction(action, acteurs = true) {
    tmpAct = {}
    tmpAct[action] = acteurs
    actCmds.push({
        actions: tmpAct
    })
}

exports.doAct = async function doAct(action, force = false) {

    actCmds = []
    let now = new Date().getTime()
    if (!force && lastDone[action] && lastDone[action] < now - 30 * 60 * 1000) return {
        commands: [{
            messages: [{
                scope: 'global',
                message: 'Sorry, I can\'t do that more than once every 30 minutes.'
            }]
        }]
    }

    switch (action) {

        case 'startup':
            actCmds.push({
                messages: [{
                    scope: 'global',
                    message: 'I will be unavailable for a minute.'
                }]
            })
            actCmds.push({
                actions: {
                    repair: [
                        '#Teleport -117564.797 -67794.680 36809.430',
                        '#Teleport -107551.336 -67783.750 36857.059'
                    ]
                }
            })
            actCmds.push({
                messages: [{
                    scope: 'global',
                    message: '#Teleport -117331 -66059 37065'
                }]
            })
            actCmds.push({
                actions: {
                    piss: true
                }
            })
            actCmds.push({
                actions: {
                    shit: true
                }
            })
            actCmds.push({
                actions: {
                    shit: true
                }
            })
            global.commands = {}
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: '#Teleport -116369 -65906 37144'
                    },
                    {
                        scope: 'global',
                        message: 'I\'m available again.'
                    }
                ],
                actions: {
                    idle: true
                }
            })
            break

        case 'business':
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: 'I will be unavailable for a minute.'
                    },
                    {
                        scope: 'global',
                        message: '#Teleport -117331 -66059 37065'
                    }
                ]
            })
            actCmds.push({
                actions: {
                    piss: true
                }
            })
            actCmds.push({
                actions: {
                    shit: true
                }
            })
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: '#Teleport -116369 -65906 37144'
                    },
                    {
                        scope: 'global',
                        message: 'I\'m available again.'
                    }
                ],
                actions: {
                    idle: true
                }
            })
            break

        case 'shit':
            addMessage('global', 'I will be unavailable for a minute.')
            addMessage('global', '#Teleport -117331 -66059 37065')
            addAction('shit')
            addMessage('global', '#Teleport -116369 -65906 37144')
            addMessage('global', 'I\'m available again.')
            addAction('idle')
            break

        case 'piss':
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: 'I will be unavailable for a minute.'
                    },
                    {
                        scope: 'global',
                        message: '#Teleport -117331 -66059 37065'
                    }
                ],
                actions: {
                    piss: true
                }
            })
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: '#Teleport -116369 -65906 37144'
                    },
                    {
                        scope: 'global',
                        message: 'I\'m available again.'
                    }
                ],
                actions: {
                    idle: true
                }
            })
            break

        case 'dress':
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: 'I will be unavailable for a minute.'
                    },
                    {
                        scope: 'global',
                        message: '#Teleport -117331 -66059 37065'
                    }
                ],
                actions: {
                    dress: true
                }
            })
            global.commands = {}
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: '#Teleport -116369 -65906 37144'
                    },
                    {
                        scope: 'global',
                        message: 'I\'m available again.'
                    }
                ],
                actions: {
                    idle: true
                }
            })
            break

        case 'repair':
            actCmds.push({
                messages: [{
                    scope: 'global',
                    message: 'I will be unavailable for a minute.'
                }],
                actions: {
                    repair: [
                        '#Teleport -117564.797 -67794.680 36809.430',
                        '#Teleport -107551.336 -67783.750 36857.059'
                    ]
                }
            })
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: '#Teleport -116369 -65906 37144'
                    },
                    {
                        scope: 'global',
                        message: 'I\'m available again.'
                    }
                ],
                actions: {
                    idle: true
                }
            })
            break

        case 'light':
            actCmds.push({
                messages: [{
                    scope: 'global',
                    message: 'I will be unavailable for 5 minutes.'
                }],
                actions: {
                    light: [
                        '#Teleport -116806 -65842 37065',
                        '#Teleport -117327 -66464 37064',
                        '#Teleport -117317 -66969 37064',
                        '#Teleport -116066 -65673 37065',
                        '#Teleport -116066 -66445 37065',
                        '#Teleport -116066 -66714 37065',
                        '#Teleport -116066 -67103 37064',
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
                    ]
                }
            })
            actCmds.push({
                messages: [{
                        scope: 'global',
                        message: '#Teleport -116369 -65906 37144'
                    },
                    {
                        scope: 'global',
                        message: 'I\'m available again.'
                    }
                ],
                actions: {
                    idle: true
                }
            })
            break

        case 'idle':
            actCmds.push({
                messages: [{
                    scope: 'global',
                    message: '#Teleport -116369 -65906 37144'
                }],
                actions: {
                    idle: true
                }
            })
            break

        default:
            let actions = {}
            actions[action] = true
            actCmds.push({
                actions: actions
            })
            break

    }

    lastDone[action] = now
    return {
        commands: actCmds
    }
}