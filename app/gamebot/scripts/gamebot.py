from plugins import procControl
from plugins import scb
import pyautogui
import _message
import _action
import sys


scb.reg(
    failSafe = 0.1,
    resolution={
        'x': 1440,
        'y': 900
    },
    regions={
        'scope': (380, 405, 55, 25),
        'loading': (1205, 805, 110, 40),
        'inventory': (400, 0, 640, 800),
        'chat': (20, 250, 415, 185),
        'invDrag': (700, 0, 35, 900),
        'map': (270 ,0 ,900 ,900 )
    }
)

startup = False
if (not procControl.focus()):
    startup = True

try:
    if (not procControl.focus(solve=True)):
        raise Exception('Window not found')
    if (not scb.goReadyState()):
        raise Exception('Game not ready')
    scb.doPrint({
        'state': 'running'
    })
except Exception as e:
    scb.doPrint({
        'error': True,
        'errorMessage': str(e),
        'restart': True
    })
    scb.restartPC()

scb.flushPrint()


if(startup):
    _action.startup()


while (True):
    try:
        cmd = input()
        scb.doPrint({'command': cmd})

        procControl.focus(solve=True)
        scb.safeMouse()

        if(cmd == 'MESSAGES'):
            _message.process()
        elif(cmd == 'ACTION'):
            _action.process()
        else:
            scb.doPrint({'Error': 'Command not recognized'})
    except Exception as e:
        scb.doPrint({
            'error': True,
            'errorMessage': str(e)
        })
        if (not procControl.focus(solve=True)):
            scb.restartPC()
            raise Exception('Window not found')
        if (not scb.goReadyState()):
            scb.restartPC()
            raise Exception('Game not ready')

    scb.flushPrint()
    scb.safeMouse()
