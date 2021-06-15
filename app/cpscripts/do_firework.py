from use import scb
from use import control


def shoot():
    scb.focus('scum')
    control.teleport('#Teleport -117112 -66377 37477')
    scb.sendChat('#SpawnItem Fireworks_Big', True, safe=True)
    scb.openTab()
    control.doOnThis('img/startup/firework.png',
                     'img/startup/use.png', 2)
    scb.sendChat('#SetFakeName [SF-BOT][FIREWORK]', True, safe=True)
    scb.sendChat('There you go', True, safe=True)
    scb.sendChat('#ClearFakeName', True, safe=True)
    control.teleport('#Teleport -117129 -66713 37065')


if __name__ == '__main__':
    shoot()
