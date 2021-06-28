from plugins import procControl
from plugins import scb
import pyautogui
import _message
import _action

scb.reg(
    resolution={
        'x': 1440,
        'y': 900
    },
    regions={
        'scope': (380, 405, 55, 25),
        'loading': (1205, 805, 110, 40),
        'inventory': (400, 0, 640, 800),
        'chat': (20, 250, 415, 185),
        'invDrag': (700, 0, 35, 900)
    }
)

if (not procControl.focus('scum', solve=True)):
    raise Exception('Window not found')


if (not scb.goReadyState()):
    procControl.solveProblems()
    raise Exception('Game not ready')


while (True):
    cmd = input('\nCommand: ')
    scb.doPrint(cmd)

    try:

        if(cmd == 'MESSAGE'):
            _message.process()
        elif(cmd == 'ACTION'):
            _action.process()
        else:
            scb.doPrint('Error: Command not recognized\n')

    except:
        scb.doPrint('Something went wrong...')
        if (not procControl.focus('scum', solve=True)):
            raise Exception('Window not found')
        if (not scb.goReadyState()):
            scb.restart()
            raise Exception('Game not ready')
