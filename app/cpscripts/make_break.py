from use import scb
from use import control


def doBreak():
    scb.focus('scum')
    scb.sendChat('#SpawnItem Ganoderma_Lucidum', True, safe=True)
    control.openTab()
    control.doOnThis('img/startup/mushroom.png',
                     'img/startup/essen.png', 0.05)


if __name__ == '__main__':
    doBreak()
