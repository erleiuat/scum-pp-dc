from use import scb
from use import control


def shoot():
    scb.focus('scum')
    scb.sendChat('#Teleport -117112 -66377 37477')
    scb.sendChat('#SpawnItem Fireworks_Big')
    control.doOnThis('img/startup/firework.png', 'img/startup/use.png', 2)
    scb.sleepLong()
    scb.sendChat('#SetFakeName [SF-BOT][FIREWORK]')
    scb.sleepLong()
    scb.sendChat('There you go')
    scb.sleepLong()
    scb.sendChat('#ClearFakeName')
    scb.idlePos()


if __name__ == '__main__':
    shoot()
