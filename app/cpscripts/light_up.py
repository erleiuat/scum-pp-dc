from use import scb
from use import control


def doIt():
    torches = [
        '#Teleport -116806 -65842 37065',
        '#Teleport -117327 -66464 37064',
        '#Teleport -117317 -66969 37064',
        '#Teleport -116304 -65755 37064',
        '#Teleport -116298 -67044 37064',
        '#Teleport -113569 -66546 36994',
        '#Teleport -113786 -67711 36987',
        '#Teleport -111791 -68827 36999',
        '#Teleport -111650 -67672 36998',
        '#Teleport -111521 -66752 36999',
        '#Teleport -110207 -66393 37023',
        '#Teleport -111963 -63041 37290',
        '#Teleport -110792 -63462 37263',
        '#Teleport -112653 -72299 36621',
        '#Teleport -111485 -72208 36588'
    ]

    control.teleport('#Teleport -117331 -66059 37065')
    scb.sendChat('#SpawnItem Lighter', wait=True, safe=True)
    scb.sleepLong()

    control.doOnThis('img/startup/lighter.png',
                     'img/startup/aufnehmen.png', 0.8)

    for torch in torches:
        control.teleport(torch)
        scb.sendChat('#SpawnItem Wooden_Plank 2', wait=True, safe=True)
        for x in range(2):
            control.doOnThis('img/startup/fackel.png',
                             'img/startup/schueren.png', 1.8)
        control.doOnThis('img/startup/fackel.png',
                         'img/startup/anzuenden.png', 1.8)

    control.teleport('#Teleport -117129 -66713 37065')
    # Teleport -117129 -66713 37065      <- Theke
    # Teleport -117331 -66059 37065      <- Hinterzimmer


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][LIGHT]', wait=True, safe=True)
    scb.sendChat(
        'I will now maintain the trading zone and be unavailable for about 5 minutes.', wait=True, safe=True)
    doIt()
    scb.sendChat('I am done and available again!', wait=True, safe=True)
    scb.sendChat('#ClearFakeName', wait=True, safe=True)
