const cmdBuilder = require('./cmdbuilder')


exports.doAct = async function doAct(action, force = false) {
    cmdBuilder.begin()

    let d = new Date()
    tmpCmd = {
        time: {
            date: global.nZero.form(d.getDate()) + '.' + global.nZero.form((d.getMonth() + 1)) + '.' + d.getFullYear(),
            time: global.nZero.form(d.getHours()) + ':' + global.nZero.form(d.getMinutes()) + ':' + global.nZero.form(d.getSeconds())
        }
    }

    if (!force && cmdBuilder.tooEarly(action, 15)) return cmdBuilder.fullCommand(tmpCmd)

    switch (action) {

        case 'startup':
            cmdBuilder.addMessage('global', 'I will be unavailable for a minute.')
            cmdBuilder.addAction('repair', [
                '#Teleport -117564.797 -67794.680 36809.430',
                '#Teleport -107551.336 -67783.750 36857.059'
            ])
            cmdBuilder.addMessage('global', '#Teleport -117331 -66059 37065')
            cmdBuilder.addAction('shit')
            cmdBuilder.addAction('shit')
            cmdBuilder.addAction('piss')
            cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
            cmdBuilder.addMessage('global', 'I\'m available again.')
            cmdBuilder.addAction('idle')
            break

        case 'business':
            cmdBuilder.addMessage('global', 'I will be unavailable for a minute.')
            cmdBuilder.addMessage('global', '#Teleport -117331 -66059 37065')
            cmdBuilder.addAction('piss')
            cmdBuilder.addAction('shit')
            cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
            cmdBuilder.addMessage('global', 'I\'m available again.')
            cmdBuilder.addAction('idle')
            break

        case 'shit':
            cmdBuilder.addMessage('global', 'I will be unavailable for a minute.')
            cmdBuilder.addMessage('global', '#Teleport -117331 -66059 37065')
            cmdBuilder.addAction('shit')
            cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
            cmdBuilder.addMessage('global', 'I\'m available again.')
            cmdBuilder.addAction('idle')
            break

        case 'piss':
            cmdBuilder.addMessage('global', 'I will be unavailable for a minute.')
            cmdBuilder.addMessage('global', '#Teleport -117331 -66059 37065')
            cmdBuilder.addAction('piss')
            cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
            cmdBuilder.addMessage('global', 'I\'m available again.')
            cmdBuilder.addAction('idle')
            break

        case 'dress':
            cmdBuilder.addMessage('global', 'I will be unavailable for a minute.')
            cmdBuilder.addMessage('global', '#Teleport -117331 -66059 37065')
            cmdBuilder.addAction('dress')
            cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
            cmdBuilder.addMessage('global', 'I\'m available again.')
            cmdBuilder.addAction('idle')
            break

        case 'repair':
            cmdBuilder.addMessage('global', 'I will be unavailable for a minute.')
            cmdBuilder.addAction('repair', [
                '#Teleport -117564.797 -67794.680 36809.430',
                '#Teleport -107551.336 -67783.750 36857.059'
            ])
            cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
            cmdBuilder.addMessage('global', 'I\'m available again.')
            cmdBuilder.addAction('idle')
            break

        case 'light':
            cmdBuilder.addMessage('global', 'I will be unavailable for 5 minutes.')
            cmdBuilder.addMessage('global', '#Teleport -117331 -66059 37065')
            cmdBuilder.addAction('light', [
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
            ])
            cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
            cmdBuilder.addMessage('global', 'I\'m available again.')
            cmdBuilder.addAction('idle')
            break

        case 'idle':
            cmdBuilder.addMessage('global', '#Teleport -116369 -65906 37144')
            cmdBuilder.addAction('idle')
            break

        default:
            cmdBuilder.addAction(action)
            break

    }

    return cmdBuilder.fullCommand(tmpCmd)
}