from plugins import scb
import pyautogui


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
        scb.sleep(1)
    elif(action == 'piss'):
        scb.safeClick(scb.getPoint(810, 300))
        scb.sleep()
        pyautogui.keyUp('tab')
        scb.sleep(1)
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
    itemLoc = scb.onScreen(victim, sure=0.8, region=scb.getRegion('inventory'))
    if(itemLoc):
        scb.safeClick(itemLoc, button='right')
        actionLoc = scb.onScreen(action, sure=0.8, region=scb.getRegion('inventory'))
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
    actionLoc = scb.onScreen(action, sure=0.8, region=scb.getRegion('inventory'))
    if (actionLoc):
        scb.safeClick(actionLoc)
        scb.sleep()
        pyautogui.keyUp('f')
        scb.sleep(duration)
    pyautogui.keyUp('f')
    scb.openTab()
    pyautogui.press('t')
