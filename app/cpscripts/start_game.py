from use import scb
import act_repair
import webbrowser
import subprocess
import os

fullBatPath = os.path.dirname(os.path.realpath(__file__))


print('\n\n')


print(' -> Killing running processes')
subprocess.call([fullBatPath + '\\use\\kill_steam.bat'])
subprocess.call([fullBatPath + '\\use\\kill_scum.bat'])
scb.sleep(5)

print(' -> Starting Scum')
webbrowser.open('steam://rungameid/513710')
scb.sleep(5)


count = 0
print(' -> Waiting for Main-Menu')
while(not scb.click('img/fortsetzen.png', duration=1)):
    scb.focus('scum')
    scb.centerMouse()
    count = count + 1
    if(count > 100):
        raise Exception('Could not start game (1)')
    scb.sleep(1)
print(' -> Main-Menu loaded! Took ' + str(count) + ' seconds')


count = 0
print(' -> Waiting for ingame')
while(not scb.onScreen('img/startup/mic.png')):
    scb.focus('scum')
    count = count + 1
    if(count > 100):
        raise Exception('Could not start game (2)')
    scb.sleep(1)
print(' -> Game ready! Took ' + str(count) + ' seconds')

scb.sleep(30)
scb.ready()
scb.sleep(5)
scb.sendChat('#SetFakeName [SF-BOT][BOOTING]')
scb.sleepLong()
scb.sendChat('I\'m getting prepared...')
scb.sleepLong()

# -------------------------------   SETUP

act_repair.doIt()

# -------------------------------   SETUP DONE

scb.idlePos()
scb.sendChat("#ShowOtherPlayerInfo true")
scb.sleepLong()
scb.sendChat("I'm ready!")
scb.sendChat('#ClearFakeName')


print('\n\n')
