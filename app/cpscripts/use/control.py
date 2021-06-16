from use import scb
import pyautogui


def doOnThis(victim, action, duration=5):
    if(scb.onScreen('img/c_stumm.png')):
        pyautogui.press('esc')
    scb.sleep(0.5)
    itemLoc = scb.onScreen(victim, sure=0.8)
    if (itemLoc):
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


def takeA(action):
    if(scb.onScreen('img/c_stumm.png')):
        pyautogui.press('esc')
    scb.sleep(0.1)
    pyautogui.keyDown('tab')
    scb.sleep(0.8)
    toilet = scb.onScreen('img/startup/toilet.png', sure=0.8)
    if(toilet):
        pyautogui.moveTo(toilet)
        pyautogui.click(toilet)

        if(action == 'shit'):
            shit = scb.onScreen('img/startup/t_shit.png', sure=0.8)
            if(shit):
                pyautogui.moveTo(shit)
                pyautogui.click(shit)
                pyautogui.keyUp('tab')
                scb.sleep(35)
                return True
        else:
            piss = scb.onScreen('img/startup/t_piss.png', sure=0.8)
            if(piss):
                pyautogui.moveTo(piss)
                pyautogui.click(piss)
                pyautogui.keyUp('tab')
                scb.sleep(15)
                return True
    pyautogui.keyUp('tab')
    return False
