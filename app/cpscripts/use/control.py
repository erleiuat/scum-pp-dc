from use import scb
from datetime import datetime
import pyautogui


def getMap(firstTime=False):
    scb.focus('scum')
    if(scb.onScreen('img/c_stumm.png')):
        pyautogui.press('esc')
    scb.sleep()
    pyautogui.press('subtract')
    pyautogui.press('m')
    scb.sleepLong()
    if(firstTime):
        scb.sleep(4)
    x, y = pyautogui.size()
    now = datetime.now()
    fileName = now.strftime('%Y_%m_%d.%H_%M_%S')+'.png'
    fullPath = './app/storage/maps/'+fileName
    pyautogui.screenshot(fullPath,
                         region=(((x/2) - (y/2)), 0, y, y))
    scb.sleep(2)
    pyautogui.press('subtract')
    pyautogui.keyDown('tab')
    scb.sleep(0.02)
    pyautogui.keyUp('tab')
    scb.sleepLong()
    pyautogui.press('t')
    scb.sleep()
    return {
        'fileName': fileName,
        'fullPath': fullPath
    }


def doOnF(action, duration=5):
    scb.focus('scum')
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
    scb.focus('scum')
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
    scb.focus('scum')
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
