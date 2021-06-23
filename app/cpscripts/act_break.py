from use import scb
from use import control


def doIt():
    scb.focus('scum')
    scb.sendChat('#SpawnItem Corn', chatOnly=True)
    control.doOnThis('img/break/corn.png',
                     'img/break/eat.png', 0.05)
    scb.ready()


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][LUNCHBREAK]', chatOnly=True)
    scb.sleep()
    doIt()
    scb.sleep()
    scb.sendChat('#ClearFakeName')
