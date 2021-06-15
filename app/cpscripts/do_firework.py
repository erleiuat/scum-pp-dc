from use import scb
from use import control


def shoot():
    scb.focus('scum')
    control.teleport('#Teleport -117112 -66377 37477')
    scb.sendChat('#SpawnItem Fireworks_Big', wait=True, safe=True)
    if(not control.doOnThis('img/startup/firework.png',
                            'img/startup/use.png', 2)):
        print('\nFAILED TO LIGHT FIREWORK\n')
    scb.sendChat('#SetFakeName [SF-BOT][FIREWORK]', wait=True, safe=True)
    scb.sendChat('There you go', wait=True, safe=True)
    scb.sendChat('#ClearFakeName', wait=True, safe=True)
    control.teleport('#Teleport -117129 -66713 37065')


if __name__ == '__main__':
    shoot()
