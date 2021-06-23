from use import scb
from use import control
import act_break

def doIt(repeats=1):
    scb.focus('scum')
    scb.sendChat('#Teleport -117331 -66059 37065', chatOnly=True)
    control.takeA('piss')
    for x in range(repeats):
        control.takeA('shit')


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][BUSINESS]', chatOnly=True)
    scb.sendChat('I will be unavailable for one minute.', chatOnly=True)
    scb.sleepLong()
    doIt()
    scb.idlePos()
    scb.sleepLong()
    act_break.doIt()
    scb.sleepLong()
    scb.sendChat('I\'m available again!', chatOnly=True)
    scb.sendChat('#ClearFakeName')
