from use import scb
from use import control


def doIt():
    scb.focus('scum')
    scb.sendChat('#Teleport -117112 -66377 37477')
    scb.sendChat('#SpawnItem Fireworks_Big')
    control.doOnThis('img/startup/firework.png', 'img/startup/use.png', 2)
    scb.sleepLong()


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][FIREWORK]')
    scb.sleepLong()
    doIt()
    scb.idlePos()
    scb.sleepLong()
    scb.sendChat('#ClearFakeName')
