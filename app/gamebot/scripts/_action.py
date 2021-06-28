from plugins import control
from plugins import scb
import pyautogui


def process():
    action = input('Action: ')
    scb.doPrint(action)

    scb.safeMouse()

    if(action.lower() == 'eat'):
        eat()
    elif(action.lower() == 'shit'):
        control.takeA('shit')
    elif(action.lower() == 'piss'):
        control.takeA('piss')
    elif(action.lower() == 'idle'):
        control.sitDown()
    elif(action.lower() == 'dress'):
        dress()
    elif(action.lower() == 'light'):
        light()
    elif(action.lower() == 'repair'):
        repair()
    elif(action.lower() == 'restart'):
        scb.restart()

    scb.safeMouse()


def repair():
    currentPosition = scb.getPosition()
    teleports = input('Teleports: ')
    teleports = teleports.split(';')
    scb.doPrint(teleports)

    for teleport in teleports:
        scb.sendMessage(teleport)
        scb.sendMessage('#SpawnItem Tool_Box 3')
        for x in range(3):
            control.actF('img/act/repair.png', duration=4)

    scb.sendMessage(
        '#Teleport '+currentPosition['x']+' '+currentPosition['y']+' '+currentPosition['z'])

def light():
    currentPosition = scb.getPosition()
    teleports = input('Teleports: ')
    teleports = teleports.split(';')
    scb.doPrint(teleports)

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
            duration=0.05
        )


def eat():
    scb.sendMessage('#SpawnItem Corn')
    control.act(
        'img/act/corn.png',
        'img/act/eat.png',
        0.005
    )
