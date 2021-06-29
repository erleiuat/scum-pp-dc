from plugins import scb
from datetime import datetime
from pathlib import Path
import pyautogui


def mapshot():
    pyautogui.press('esc')
    pyautogui.press('m')
    pyautogui.press('subtract')
    now = datetime.now()
    folderName = now.strftime('%Y_%m_%d')
    fileName = now.strftime('%Y_%m_%d.%H_%M_%S')+'.png'
    Path('./app/storage/maps/'+folderName).mkdir(parents=True, exist_ok=True)
    fullPath = './app/storage/maps/'+folderName+'/'+fileName
    pyautogui.screenshot(fullPath,region=scb.getRegion('map'))
    scb.sleep(2)
    pyautogui.press('subtract')
    scb.openTab()
    pyautogui.press('t')
    scb.doPrint({'data': {
        'fileName': fileName,
        'fullPath': fullPath
    }})


def takeA(action):
    pyautogui.press('esc')
    pyautogui.press('esc')
    pyautogui.keyDown('tab')
    scb.sleep(0.8)
    scb.safeClick(scb.getPoint(810, 395))
    if(action == 'shit'):
        scb.safeClick(scb.getPoint(870, 365))
        scb.sleep()
        pyautogui.keyUp('tab')
        scb.sleep(35)
    elif(action == 'piss'):
        scb.safeClick(scb.getPoint(810, 300))
        scb.sleep()
        pyautogui.keyUp('tab')
        scb.sleep(15)
    else:
        pyautogui.keyUp('tab')
    scb.openTab()
    pyautogui.press('t')


def sitDown():
    pyautogui.press('esc')
    pyautogui.press('esc')
    pyautogui.keyDown('tab')
    scb.sleep(0.8)
    scb.safeClick(scb.getPoint(630, 500))
    scb.safeClick(scb.getPoint(810, 300))
    scb.sleep(0.05)
    pyautogui.keyUp('tab')
    scb.openTab()
    pyautogui.press('t')


def act(victim, action, duration=1):
    pyautogui.press('esc')
    itemLoc = scb.onScreen(victim, sure=0.75, bw=True, region=scb.getRegion('inventory'))
    if(itemLoc):
        scb.safeClick(itemLoc, button='right')
        scb.sleep(0.5)
        actionLoc = scb.onScreen(action, sure=0.75, bw=True, region=scb.getRegion('inventory'))
        if(actionLoc):
            scb.safeClick(actionLoc)
            scb.sleep(duration)
        else:
            pyautogui.press('esc')
    
    pyautogui.press('t')


def actF(action, duration=1):
    pyautogui.press('esc')
    pyautogui.press('esc')
    pyautogui.keyDown('f')
    scb.sleep(0.8)
    actionLoc = scb.onScreen(action, sure=0.8, bw=True,region=scb.getRegion('inventory'))
    if (actionLoc):
        scb.safeClick(actionLoc)
        scb.sleep()
        pyautogui.keyUp('f')
        scb.sleep(duration)
    pyautogui.keyUp('f')
    scb.openTab()
    pyautogui.press('t')
