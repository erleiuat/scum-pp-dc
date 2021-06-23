from os import chdir
import time
import pyautogui
import win32gui
import win32con
import keyboard


middleRegion = (400, 0, 630, 820)
cStummRegion = (20, 400, 70, 40)
cRoomRegion = (380, 400, 440, 440)
invNaviRegion = (480, 0, 120, 30)
invHandsRegion = (1045, 700, 75, 30)
centerRegion = (720, 450)
"""
middleRegion = (400, 30, 630, 820)
cStummRegion = (20, 430, 70, 40)
cRoomRegion = (380, 430, 440, 440)
invNaviRegion = (480, 30, 120, 30)
invHandsRegion = (1045, 730, 75, 30)
centerRegion = (720, 480)
"""

def onScreen(img, bw=True, sure=0.9, region=False):
    if(region == 'middle'):
        isThere = pyautogui.locateCenterOnScreen(
            path() + img, grayscale=bw, confidence=sure, region=middleRegion)
    elif(region):
        isThere = pyautogui.locateCenterOnScreen(
            path() + img, grayscale=bw, confidence=sure, region=region)
    else:
        isThere = pyautogui.locateCenterOnScreen(
            path() + img, grayscale=bw, confidence=sure)
    if(isThere):
        return isThere
    else:
        return False


def safeClick(x, y, double=False):
    pyautogui.moveTo(x, y)
    pyautogui.move(10, 10, duration=0.05)
    pyautogui.move(-10, -10, duration=0.05)
    pyautogui.click()
    if(double):
        pyautogui.click()

def path():
    return './app/cpscripts/'


def sleep(seconds=0.05):
    time.sleep(seconds)


def sleepLong():
    sleep(0.6)


def pressTab():
    sleepLong()
    pyautogui.keyDown('tab')
    sleep(0.01)
    pyautogui.keyUp('tab')
    sleepLong()

def chatOpen(globalChat=False):
    if(globalChat):
        isThere = onScreen('img/c_global.png', bw=False, region=cRoomRegion)
    else:
        isThere = onScreen('img/c_stumm.png', region=cStummRegion)
    if(isThere):
        return True
    return False


def tabOpen():
    isThere = onScreen('img/inventar.png', region=invNaviRegion)
    if(isThere):
        return True
    return False

def focus(window_name):
    if(window_name.lower() in win32gui.GetWindowText(win32gui.GetForegroundWindow()).lower()):
        return True

    def window_dict_handler(hwnd, top_windows):
        top_windows[hwnd] = win32gui.GetWindowText(hwnd)

    try:
        tw, expt = {}, True
        win32gui.EnumWindows(window_dict_handler, tw)
        for handle in tw:
            if (window_name.lower() in tw[handle].lower()):
                win32gui.ShowWindow(handle, win32con.SW_NORMAL)
                win32gui.BringWindowToTop(handle)
                win32gui.SetForegroundWindow(handle)
                sleep()
                return True
        return False
    except:
        return False


def idlePos():
    ready(chatOnly=True)
    keyboard.write('#Teleport -116369 -65906 37144')                                
    pyautogui.press('enter')
    loading()
    pyautogui.keyDown('tab')
    sleep(0.8)
    safeClick(625, 500)
    safeClick(805, 300)
    sleep()
    pyautogui.keyUp('tab')
    ready()
    return True

def click(img, button='left', bw=True, sure=0.9, duration=0.1):
    toClick = onScreen(img, bw=bw, sure=sure)
    if(toClick):
        pyautogui.click(toClick, button=button, duration=duration)
        sleep()
        return True
    else:
        return False


def centerMouse(click=False):
    pyautogui.moveTo(centerRegion, duration=0.02)
    if(click):
        pyautogui.click()


def ready(chatOnly=False):
    print('READY -> Checking if chat is ready')
    focus('scum')
    if(not chatOnly):
        openTab()
    if(chatOpen(globalChat=True)):
        pyautogui.hotkey('ctrl', 'a')
        pyautogui.press('del')
        print('READY -> Chat is ready')
        return True
    if(not chatOpen()):
        openTab()
        sleep()
        pyautogui.press('t')
        sleep()
        pyautogui.hotkey('ctrl', 'a')
        pyautogui.press('del')
    if(chatOpen() and not chatOpen(globalChat=True)):
        while(not chatOpen(globalChat=True)):
            pyautogui.press('tab')
            sleep(0.5)
        return True
    if(chatOpen() and chatOpen(globalChat=True)):
        pyautogui.hotkey('ctrl', 'a')
        pyautogui.press('del')
        print('READY -> Chat is ready')
        return True
    raise Exception('NOT READY')


def loading():
    count = 0
    time.sleep(1)
    print('LOADING -> Waiting till done')
    while(onScreen('img/laden.png')):
        count = count + 1
        time.sleep(0.1)
    print('LOADING -> Done, took ' + str(count/2) + ' seconds')


def dragInv():
    ist = onScreen('img/invDrag.png', region='middle')
    soll = onScreen('img/invDrag_to.png', region=invHandsRegion)
    while(ist.y < (soll.y - 50) or ist.y > (soll.y + 50)):
        pyautogui.moveTo(ist)
        sleep()
        pyautogui.mouseDown()
        sleep()
        pyautogui.moveTo(soll, duration=0.5)
        sleep()
        pyautogui.mouseUp()
        sleep()
        ist = onScreen('img/invDrag.png', region='middle')
    centerMouse()
    return True


def openTab():
    if(chatOpen()):
        pyautogui.press('esc')
    if(tabOpen()):
        dragInv()
        return True
    pressTab()
    if(not tabOpen()):
        return False
    if(onScreen('img/invDrag.png')):
        dragInv()
    return True


def sendChat(msg, chatOnly=False, noCheck=False):
    if(not noCheck):
        if (not chatOpen(globalChat=True)):
            ready(chatOnly=chatOnly)
    pyautogui.hotkey('ctrl', 'a')
    pyautogui.press('del')
    keyboard.write(str(msg))
    pyautogui.press('enter')
    print('CHAT -> Sent: ' + str(msg))
    if(msg.lower().startswith('#teleport')):
        loading()
        ready(chatOnly=chatOnly)
    return True
