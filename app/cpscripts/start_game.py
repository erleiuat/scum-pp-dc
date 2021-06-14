from pyautogui import failSafeCheck
from use import scb
from use import control
import make_break
import webbrowser
import subprocess
import os

fullBatPath = os.path.dirname(os.path.realpath(__file__))
torches = [
    '#Teleport -111116.359 -65466.762 37041.824',
    '#Teleport -110238.148 -64258.730 37210.738',
    '#Teleport -108762.930 -62645.059 37216.547',
    '#Teleport -115601.555 -59773.836 37359.078',
    '#Teleport -119449.445 -58504.863 37661.332',
]

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
scb.sendChat('BOT PREPARES ITSELF (ready in about 5 minutes)', True, safe=True)

# -------------------------------   SETUP
control.teleport('#Teleport -117351 -66117 37064')
scb.sendChat('#SpawnItem Lighter', True, safe=True)
scb.sleepLong()

control.openTab()
control.enlargeInv()

control.pickup('img/startup/lighter.png')

for torch in torches:
    scb.sleep()
    control.teleport(torch)
    scb.sleepLong()
    scb.sendChat('#SpawnItem Wooden_Plank 1', True, safe=True)
    control.openTab()
    for x in range(1):
        control.doOnThis('img/startup/fackel.png',
                         'img/startup/schueren.png', 3)
    control.doOnThis('img/startup/fackel.png',
                     'img/startup/anzuenden.png', 3)
    scb.sleepLong()

# -------------------------------   SETUP DONE
control.teleport('#Teleport -117114.336 -66718.719 37064.668')

make_break.doBreak()
scb.ready()
scb.sendChat('SF-BOT IS READY!', True)
scb.sendChat('#ClearFakeName', True)


print('\n\n')
