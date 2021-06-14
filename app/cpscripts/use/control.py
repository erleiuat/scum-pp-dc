from use import scb
import pyautogui


def teleport(tpCommand):
    scb.sleep()
    scb.sendChat(tpCommand, safe=True)
    return True


def enlargeInv():
    invSize = scb.onScreen('img/startup/invSize.png')
    if(not invSize):
        invSize = scb.onScreen('img/startup/invSize_alt.png')
    if(invSize):
        print(invSize)
        pyautogui.moveTo(invSize)
        scb.sleep()
        pyautogui.mouseDown()
        scb.sleep()
        pyautogui.moveTo(invSize.x, (invSize.y+800), duration=2)
        scb.sleep()
        pyautogui.mouseUp()
        scb.sleep()


def pickupAll(itemImg):
    while (pickup(itemImg)):
        scb.sleep()
    return True


def pickup(itemImg):
    scb.sleep()
    itemLoc = scb.onScreen(itemImg)
    if (itemLoc):
        pyautogui.moveTo(itemLoc)
        scb.sleep()
        pyautogui.doubleClick(itemLoc)
        scb.sleep()
        return True
    else:
        return False


def doOnThis(victim, action, duration=5):
    if(scb.onScreen('img/c_global.png')):
        pyautogui.press('esc')
    scb.sleep()
    itemLoc = scb.onScreen(victim, bw=True)
    if (itemLoc):
        pyautogui.moveTo(itemLoc)
        scb.sleep()
        pyautogui.click(itemLoc, button='right')
        scb.sleep()
        actionLoc = scb.onScreen(action, sure=0.8)
        if (actionLoc):
            pyautogui.moveTo(actionLoc)
            scb.sleep()
            pyautogui.click(actionLoc)
            scb.sleep(duration+0.5)
            return True
        else:
            pyautogui.press('esc')
            return False
    else:
        return False


def doAllOnThis(victim, action, duration=5):
    while(doOnThis(victim, action, duration=duration)):
        scb.sleep()
    return True
