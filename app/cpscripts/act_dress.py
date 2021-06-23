from use import scb
from use import control

def doIt():

    items = [
        'Tights_01_02',
        'Tactical_Gloves_03',
        'Sneakers_02_04',
        'Halloween_Mask_Plague',
        'Ghillie_Suit_Jacket_Winter',
        'Beenie_3_hole_06',
        'Bulletproof_Vest_04'
    ]

    scb.focus('scum')
    scb.sleepLong()
    scb.sendChat('#Teleport -117331 -66059 999999', chatOnly=True)
    scb.sleep()
    scb.openTab()
    for x in range(12):
        scb.safeClick(355, 95, double=True)

    scb.sendChat('#Teleport -117331 -66059 37065', chatOnly=True)
    for item in items:
        scb.sleepLong()
        scb.sendChat('#SpawnItem '+item, chatOnly=True)

    for item in items:
        control.doOnThis('img/dress/'+item+'.png', 'img/dress/ausruesten.png', duration=0.05)


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][MAINTENANCE]', chatOnly=True)
    scb.sendChat('I will now maintain the trading zone and be unavailable for a minute.', chatOnly=True)
    scb.sleepLong()
    doIt()
    scb.sleepLong()
    scb.idlePos()
    scb.sendChat('I\'m done and available again!', chatOnly=True)
    scb.sendChat('#ClearFakeName', chatOnly=True)
