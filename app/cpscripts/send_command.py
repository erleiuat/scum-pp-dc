from use import scb
import sys

print('\n\n')


print(' -> Checking if ready')
if(not scb.ready()):
    raise Exception(' -> Not ready')

count = 0
del sys.argv[0]
print(' -> Processing messages')
for msg in sys.argv:
    print(' -> Processing messages -> Sending: ' + msg)
    scb.sendChat(msg)
    print(' -> Processing messages -> Sent: ' + msg)
    count = count + 1
    if(count >= 2):
        scb.sleepLong()
    else:
        scb.sleep()

scb.ready()


print('\n\n')
