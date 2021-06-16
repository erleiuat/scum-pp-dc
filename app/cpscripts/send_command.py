from re import T
from use import scb
import sys

print('\n\n')

scb.ready()

count = 0
del sys.argv[0]
goIdle = False
for msg in sys.argv:
    if(msg.lower().startswith('#teleport')):
        goIdle = True
    scb.sendChat(msg, chatOnly=True, noCheck=True)
    count = count + 1
    if(count == 2):
        scb.sleep(0.4)
    if(count > 2):
        scb.sleep(0.2)

if(goIdle):
    scb.idlePos()

print('\n\n')
