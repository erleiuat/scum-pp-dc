from use import scb
from use import control

"""
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
"""

def doIt():
    torches = [
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
    ]

    scb.sleepLong()
    scb.sendChat('#Teleport -117331 -66059 37065', chatOnly=True)
    scb.sleepLong()
    scb.sendChat('#SpawnItem Lighter', chatOnly=True)
    scb.sleepLong()

    control.doOnThis('img/light/lighter.png',
                     'img/light/aufnehmen.png', 0.5)

    for torch in torches:
        scb.sendChat(torch, chatOnly=True)
        scb.sendChat('#SpawnItem Wooden_Plank 2', chatOnly=True)
        for x in range(2):
            control.doOnThis('img/light/fackel.png',
                             'img/light/schueren.png', 2)
        control.doOnThis('img/light/fackel.png',
                         'img/light/anzuenden.png', 2)


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][ILLUMINATE]', chatOnly=True)
    scb.sendChat('I will now illuminate the trading zone and be unavailable for about 5 minutes.', chatOnly=True)
    scb.sleepLong()
    doIt()
    scb.idlePos()
    scb.sendChat('I\'m done and available again!', chatOnly=True)
    scb.sendChat('#ClearFakeName')
