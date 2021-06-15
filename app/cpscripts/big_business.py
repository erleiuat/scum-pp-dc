from use import scb
from use import control


def doIt(repeats=1):
    scb.focus('scum')
    control.teleport('#Teleport -117331 -66059 37065')

    control.takeA('piss')
    for x in range(repeats):
        control.takeA('shit')

    scb.openTab()
    control.teleport('#Teleport -117129 -66713 37065')


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][BUSINESS]', wait=True, safe=True)
    scb.sendChat('I will be unavailable for one minute.', True, safe=True)
    doIt()
    scb.sendChat('I am available again!', wait=True, safe=True)
    scb.sendChat('#ClearFakeName', wait=True, safe=True)
