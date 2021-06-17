from use import scb
import pyautogui


def doOnF(action, duration=5):
    pyautogui.press('esc')
    scb.sleep()
    pyautogui.press('esc')
    scb.sleep()
    pyautogui.keyDown('f')
    scb.sleep(0.8)
    actionLoc = scb.onScreen(action, sure=0.8)
    if (actionLoc):
        pyautogui.moveTo(actionLoc.x, actionLoc.y, duration=0.3)
        pyautogui.click()
        scb.sleep()
        pyautogui.keyUp('f')
        scb.sleep(duration)
        return True
    pyautogui.keyUp('f')
    return False


def doOnThis(victim, action, duration=5):
    scb.openTab()
    itemLoc = scb.onScreen(victim, sure=0.8)
    if (itemLoc):
        pyautogui.click(itemLoc, button='right', duration=0.15)
        scb.sleep()
        actionLoc = scb.onScreen(action, sure=0.8)
        if (actionLoc):
            pyautogui.moveTo(itemLoc.x, actionLoc.y, duration=0.15)
            pyautogui.moveTo(actionLoc.x, actionLoc.y, duration=0.15)
            pyautogui.click()
            scb.sleep(duration)
            return True
        else:
            print('ACTIONLOC NOT FOUND')
            scb.centerMouse(click=True)
            return False
    else:
        print('ITEMLOC NOT FOUND')
        return False


def takeA(action):
    if(scb.onScreen('img/c_stumm.png')):
        pyautogui.press('esc')
    scb.sleep()
    pyautogui.keyDown('tab')
    scb.sleep(0.9)
    pyautogui.click(810, 400, duration=0.2)
    if(action == 'shit'):
        pyautogui.click(870, 360, duration=0.2)
        scb.sleep()
        pyautogui.keyUp('tab')
        scb.sleep(35)
        return True
    else:
        pyautogui.click(810, 300, duration=0.2)
        scb.sleep()
        pyautogui.keyUp('tab')
        scb.sleep(15)
        return True
