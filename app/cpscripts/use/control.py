from use import scb
import pyautogui


def doOnThis(victim, action, duration=5):
    if(scb.onScreen('img/c_stumm.png')):
        pyautogui.press('esc')
    scb.sleep()
    itemLoc = scb.onScreen(victim)
    if (itemLoc):
        pyautogui.click(itemLoc, button='right', duration=0.5)
        scb.sleepLong()
        actionLoc = scb.onScreen(action)
        if (actionLoc):
            pyautogui.click(actionLoc, duration=0.5)
            scb.sleep(duration)
            return True
        else:
            pyautogui.press('esc')
            return False
    else:
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
