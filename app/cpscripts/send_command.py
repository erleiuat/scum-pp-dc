from use import scb
import sys

scb.ready(chatOnly=True)

count = 0
del sys.argv[0]
goIdle = False
for msg in sys.argv:
    scb.sendChat(msg, chatOnly=True, noCheck=True)
    if(msg.lower().startswith('#teleport')):
        goIdle = True
    count = count + 1
    if(count == 2):
        scb.sleep(0.4)
        if(count > 2):
            scb.sleep(0.2)

if(goIdle):
    scb.idlePos()