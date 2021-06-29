from plugins import control
from plugins import scb
import pyautogui
import json


def startup():
    scb.goScope('global')
    scb.sendMessage('#SetFakeName [SF-BOT]')
    scb.sendMessage('#ListZombies')
    scb.sendMessage('#ShowOtherPlayerInfo true')
    scb.sendMessage('I\'m getting prepared...')
    repair(actions[action])
    control.takeA('shit')
    control.takeA('shit')
    control.takeA('piss')
    scb.sendMessage('#Teleport -116369 -65906 37144')
    control.sitDown()
    scb.sendMessage('I\'m ready!')
    eat()


def process():

    actions = json.loads(input())
    scb.doPrint({'actions': actions})

    for action in actions:
        action = action.lower()
        if(action == 'repair'):
            repair(actions[action])
        elif(action == 'light'):
            light(actions[action])
        elif(action == 'shit'):
            control.takeA('shit')
        elif(action == 'piss'):
            control.takeA('piss')
        elif(action == 'eat'):
            eat()
        elif(action == 'idle'):
            control.sitDown()
        elif(action == 'dress'):
            dress()
        elif(action == 'mapshot'):
            control.mapshot()
        elif(action == 'restart'):
            scb.restart()
        elif(action == 'awake'):
            if (not scb.goReadyState()):
                raise Exception('Game not ready')
        else:
            scb.doPrint({
                'error': True,
                'errorMessage': 'Unknown action'
            })


def repair(teleports):
    currentPosition = scb.getPosition()

    for teleport in teleports:
        scb.sendMessage(teleport)
        scb.sendMessage('#SpawnItem Tool_Box 3')
        for x in range(3):
            control.actF('img/act/repair.png', duration=4)

    scb.sendMessage(
        '#Teleport '+currentPosition['x']+' '+currentPosition['y']+' '+currentPosition['z'])


def light(teleports):
    currentPosition = scb.getPosition()

    scb.sendMessage('#SpawnItem Lighter')
    control.act(
        'img/light/lighter.png',
        'img/light/aufnehmen.png',
        duration=0.05
    )

    for teleport in teleports:
        scb.sendMessage(teleport)
        scb.sendMessage('#SpawnItem Wooden_Plank 1')
        control.act('img/light/fackel.png',
                         'img/light/schueren.png', 2)
        control.act('img/light/fackel.png',
                         'img/light/anzuenden.png', 2)

    scb.sendMessage(
        '#Teleport '+currentPosition['x']+' '+currentPosition['y']+' '+currentPosition['z'])


def dress():

    items = [
        'Tights_01_02',
        'Tactical_Gloves_03',
        'Sneakers_02_04',
        'Halloween_Mask_Plague',
        'Ghillie_Suit_Jacket_Winter',
        'Beenie_3_hole_06',
        'Bulletproof_Vest_04'
    ]

    posi = scb.getPosition()
    scb.sendMessage('#Teleport '+posi['x']+' '+posi['y']+' 999999')
    pyautogui.press('esc')
    for x in range(12):
        scb.safeClick(scb.getPoint(360, 90), double=True)
    pyautogui.press('t')
    scb.sendMessage('#Teleport '+posi['x']+' '+posi['y']+' '+posi['z'])
    for item in items:
        scb.sendMessage('#SpawnItem ' + item)
    for item in items:
        control.act(
            'img/dress/'+item+'.png',
            'img/dress/ausruesten.png', 
            duration=0.5
        )


def eat():
    scb.sendMessage('#SpawnItem Corn')
    control.act(
        'img/act/corn.png',
        'img/act/eat.png',
        0.005
    )
