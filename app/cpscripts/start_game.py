from pyautogui import failSafeCheck
from use import scb
from use import control
import make_break
import webbrowser
import subprocess
import os

fullBatPath = os.path.dirname(os.path.realpath(__file__))
torches = [
    '#Teleport -116830 -65759 37064',
    '#Teleport -117327 -66464 37064',
    '#Teleport -117317 -66969 37064',
    '#Teleport -116304 -65755 37064',
    '#Teleport -116298 -67044 37064',
    '#Teleport -113569 -66546 36994',
    '#Teleport -113786 -67711 36987',
    '#Teleport -111930 -68958 36971',
    '#Teleport -111593 -66708 36995',
    '#Teleport -110207 -66393 37023',
    '#Teleport -111963 -63041 37290',
    '#Teleport -110792 -63462 37263',
    '#Teleport -112653 -72299 36621',
    '#Teleport -111485 -72208 36588',
    '#Teleport -111650 -67672 36998',
    '#Teleport -117523 -67142 36874',
    '#Teleport -117568 -65574 37064'
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

scb.openTab()
control.enlargeInv()

control.teleport('#Teleport -117351 -66117 37064')
scb.sendChat('#SpawnItem Lighter', True, safe=True)
scb.sleepLong()

control.doOnThis('img/startup/lighter.png',
                 'img/startup/aufnehmen.png', 2)

for torch in torches:
    scb.sleep()
    control.teleport(torch)
    scb.sleepLong()
    scb.sendChat('#SpawnItem Wooden_Plank 2', True, safe=True)
    scb.openTab()
    for x in range(2):
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
