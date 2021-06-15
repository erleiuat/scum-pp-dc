from pyautogui import failSafeCheck
from use import scb
from use import control
import light_up
import make_break
import big_business
import webbrowser
import subprocess
import os

fullBatPath = os.path.dirname(os.path.realpath(__file__))


print('\n\n')

print(' -> Killing running processes')
subprocess.call([fullBatPath + '\kill_steam.bat'])
subprocess.call([fullBatPath + '\kill_scum.bat'])
scb.sleepLong()

print(' -> Starting Scum')
webbrowser.open('steam://rungameid/513710')
scb.sleepLong()


count = 0
print(' -> Waiting for Main-Menu')
while(not scb.click('img/fortsetzen.png')):
    count = count+1
    scb.sleep(1)
    scb.focus('scum')
    if(count > 100):
        raise Exception('Could not start game (1)')

print(' -> Main-Menu loaded! Took ' + str(count) + ' seconds')

count = 0
print(' -> Waiting for ingame')
while(not scb.ready(failsafe=False)):
    count = count+1
    scb.sleep(1)
    scb.focus('scum')
    if(count > 100):
        raise Exception('Could not start game (2)')

print(' -> Game ready! Took ' + str(count) + ' seconds')

scb.sendChat('#SetFakeName [SF-BOT][BOOTING]', True, safe=True)
scb.sendChat('BOT PREPARES ITSELF', True, safe=True)

scb.openTab()
control.enlargeInv()

control.teleport('#Teleport -117114.336 -66718.719 37064.668')

# -------------------------------   SETUP

# light_up.lightUp()
# big_business.doIt(4)
# make_break.doBreak()

# -------------------------------   SETUP DONE

scb.ready()
scb.sendChat('SF-BOT IS READY!', True)
scb.sendChat('#ClearFakeName', True)


print('\n\n')
