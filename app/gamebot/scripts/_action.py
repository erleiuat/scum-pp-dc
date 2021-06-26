import pyautogui
from plugins import scb
from plugins import control


def process():
    action = input('Action: ')
    print(action)

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

    scb.safeMouse()


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

    scb.sendMessage('#Location')
    posi = scb.readMessage()['message'].split()
    scb.sendMessage('#Teleport '+posi[0][2:]+' '+posi[1][2:]+' 999999')
    pyautogui.press('esc')
    for x in range(12):
        scb.safeClick(355, 115, double=True)
    pyautogui.press('t')
    scb.sendMessage('#Teleport '+posi[0][2:] +' '+posi[1][2:]+' '+posi[2][2:])
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
