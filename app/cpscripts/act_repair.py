from use import scb
from use import control


def doIt():
    flags = [
        '#Teleport -117564.797 -67794.680 36809.430',
        '#Teleport -107551.336 -67783.750 36857.059'
    ]

    for flag in flags:
        scb.sendChat(flag, chatOnly=True)
        scb.sendChat('#SpawnItem Tool_Box 3', chatOnly=True)
        for x in range(3):
            control.doOnF('img/startup/repairAll.png', duration=4)


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][MAINTENANCE]', chatOnly=True)
    scb.sendChat(
        'I will now maintain the trading zone and be unavailable for a minute.', chatOnly=True)
    scb.sleepLong()
    doIt()
    scb.sleepLong()
    scb.idlePos()
    scb.sendChat('I\'m done and available again!', chatOnly=True)
    scb.sendChat('#ClearFakeName')
