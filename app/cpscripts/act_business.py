from use import scb
from use import control


def doIt(repeats=1):
    scb.focus('scum')
    scb.sendChat('#Teleport -117331 -66059 37065')
    control.takeA('piss')
    for x in range(repeats):
        control.takeA('shit')


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][BUSINESS]')
    scb.sleepLong()
    scb.sendChat('I will be unavailable for one minute.')
    doIt()
    scb.idlePos()
    scb.sendChat('I\'m available again!')
    scb.sleepLong()
    scb.sendChat('#ClearFakeName')
