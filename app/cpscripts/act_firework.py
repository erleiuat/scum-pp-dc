from use import scb
from use import control

#OUT OF ORDER

def doIt():
    scb.focus('scum')
    scb.sendChat('#Teleport -117112 -66377 37477', chatOnly=True)
    scb.sendChat('#SpawnItem Fireworks_Big', chatOnly=True)
    control.doOnThis('img/startup/firework.png', 'img/startup/use.png', 2)


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][FIREWORK]', chatOnly=True)
    scb.sleepLong()
    #doIt()
    scb.idlePos()
    scb.sleepLong()
    scb.sendChat('#ClearFakeName')
