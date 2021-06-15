from use import scb
import pyautogui


def teleport(tpCommand):
    scb.sendChat(tpCommand, safe=True)
    return True


def pickupAll(itemImg):
    while (pickup(itemImg)):
        scb.sleep()
    return True


def pickup(itemImg):
    scb.sleep()
    itemLoc = scb.onScreen(itemImg, sure=0.8)
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
    scb.sleep(0.1)
    itemLoc = scb.onScreen(victim, sure=0.8)
    if (itemLoc):
        pyautogui.moveTo(itemLoc)
        pyautogui.click(itemLoc, button='right')
        scb.sleep(0.1)
        actionLoc = scb.onScreen(action, sure=0.8)
        if (actionLoc):
            pyautogui.moveTo(actionLoc)
            pyautogui.click(actionLoc)
            scb.sleep(duration)
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


def takeA(action):
    if(scb.onScreen('img/c_global.png')):
        pyautogui.press('esc')
    scb.sleep(0.1)
    pyautogui.keyDown('tab')
    scb.sleep(0.8)
    toilet = scb.onScreen('img/startup/toilet.png', sure=0.9)
    if(toilet):
        pyautogui.moveTo(toilet)
        pyautogui.click(toilet)

        if(action == 'shit'):
            shit = scb.onScreen('img/startup/t_shit.png', sure=0.9)
            if(shit):
                pyautogui.moveTo(shit)
                pyautogui.click(shit)
                pyautogui.keyUp('tab')
                scb.sleep(35)
                return True
        else:
            piss = scb.onScreen('img/startup/t_piss.png', sure=0.9)
            if(piss):
                pyautogui.moveTo(piss)
                pyautogui.click(piss)
                pyautogui.keyUp('tab')
                scb.sleep(15)
                return True
    pyautogui.keyUp('tab')
    return False
