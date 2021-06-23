from use import scb
from datetime import datetime
from pathlib import Path
import pyautogui


def getMap(firstTime=False):
    scb.focus('scum')
    if(scb.chatOpen()):
        pyautogui.press('esc')
    scb.sleep()
    pyautogui.press('subtract')
    pyautogui.press('m')
    scb.sleepLong()
    if(firstTime):
        scb.sleep(4)
    x, y = pyautogui.size()
    now = datetime.now()
    folderName = now.strftime('%Y_%m_%d/%H_00')
    fileName = now.strftime('%Y_%m_%d.%H_%M_%S')+'.png'
    Path('./app/storage/maps/'+folderName).mkdir(parents=True, exist_ok=True)
    fullPath = './app/storage/maps/'+folderName+'/'+fileName
    pyautogui.screenshot(fullPath,
                         region=(((x/2) - (y/2)), 0, y, y))
    scb.sleep(2)
    pyautogui.press('subtract')
    scb.pressTab()
    pyautogui.press('t')
    scb.sleep()
    return {
        'fileName': fileName,
        'fullPath': fullPath
    }


def doOnF(action, duration=5):
    scb.focus('scum')
    if(scb.chatOpen()):
        pyautogui.press('esc')
    if(scb.tabOpen()):
        pyautogui.press('esc')
    pyautogui.keyDown('f')
    scb.sleep(0.8)
    actionLoc = scb.onScreen(action, sure=0.8, region='middle')
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
    itemLoc = scb.onScreen(victim, sure=0.8, region='middle')
    if (itemLoc):
        pyautogui.click(itemLoc, button='right', duration=0.15)
        scb.sleep()
        actionLoc = scb.onScreen(action, sure=0.8, region='middle')
        if (actionLoc):
            scb.safeClick(actionLoc)
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
    if(scb.chatOpen()):
        pyautogui.press('esc')
    if(scb.tabOpen()):
        pyautogui.press('esc')
    pyautogui.keyDown('tab')
    scb.sleep(0.8)
    scb.safeClick(810, 400)
    if(action == 'shit'):
        scb.safeClick(870, 360)
        scb.sleep()
        pyautogui.keyUp('tab')
        scb.sleep(35)
        return True
    else:
        scb.safeClick(810, 300)
        scb.sleep()
        pyautogui.keyUp('tab')
        scb.sleep(15)
        return True
