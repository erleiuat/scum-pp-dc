from plugins import scb
import pyautogui


regions = {
    'inventory': (405, 0, 630, 900)
}


def takeA(action):
    pyautogui.press('esc')
    pyautogui.press('esc')
    pyautogui.keyDown('tab')
    scb.sleep(0.8)
    scb.safeClick(810, 400)
    if(action == 'shit'):
        scb.safeClick(870, 360)
        scb.sleep()
        pyautogui.keyUp('tab')
        scb.sleep(1)
    elif(action == 'piss'):
        scb.safeClick(810, 300)
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
    scb.safeClick(625, 500)
    scb.safeClick(805, 300)
    scb.sleep(0.05)
    pyautogui.keyUp('tab')
    scb.openTab()
    pyautogui.press('t')


def act(victim, action, duration=1):
    pyautogui.press('esc')
    itemLoc = scb.onScreen(victim, sure=0.8, region=regions['inventory'])
    if(itemLoc):
        scb.safeClick(itemLoc.x, itemLoc.y, button='right')
        actionLoc = scb.onScreen(action, sure=0.8, region=regions['inventory'])
        if(actionLoc):
            scb.safeClick(actionLoc.x, actionLoc.y)
            scb.sleep(duration)
        else:
            pyautogui.press('esc')
    
    pyautogui.press('t')

