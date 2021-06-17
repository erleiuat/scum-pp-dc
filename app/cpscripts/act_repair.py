from use import scb
from use import control


def doIt():
    flags = [
        '#Teleport -117564.797 -67795.508 36809.379',
        '#Teleport -107551.336 -67799.648 36856.211'
    ]

    for flag in flags:
        scb.sendChat(flag)
        scb.sendChat('#SpawnItem Tool_Box')
        control.doOnF('img/startup/repairAll.png', duration=4)


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][MAINTENANCE]')
    scb.sendChat(
        'I will now maintain the trading zone and be unavailable for a minute.')
    doIt()
    scb.idlePos()
    scb.sendChat('I\'m done and available again!')
    scb.sendChat('#ClearFakeName')