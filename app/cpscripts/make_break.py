from use import scb
from use import control


def doIt():
    scb.focus('scum')
    scb.sendChat('#SpawnItem Ganoderma_Lucidum')
    scb.openTab()
    control.doOnThis('img/startup/mushroom.png',
                     'img/startup/essen.png', 0.05)
    scb.ready()


if __name__ == '__main__':
    doIt()
