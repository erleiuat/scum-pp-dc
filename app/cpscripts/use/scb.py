import time
import pyautogui
import win32gui
import win32con
import keyboard


def path():
    return './app/cpscripts/'


def sleep(seconds=0.05):
    time.sleep(seconds)


def sleepLong():
    sleep(0.7)


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


def onScreen(img, bw=True, sure=0.9):
    isThere = pyautogui.locateCenterOnScreen(
        path() + img, grayscale=bw, confidence=sure)
    if(isThere):
        return isThere
    else:
        return False


def click(img, button='left', bw=True, sure=0.9):
    toClick = onScreen(img, bw=bw, sure=sure)
    if(toClick):
        pyautogui.moveTo(toClick)
        pyautogui.click(button=button)
        sleep()
        return True
    else:
        return False


def centerMouse():
    x, y = pyautogui.size()
    pyautogui.moveTo((x/2), (y/2), duration=0.2)


def ready():
    imgChat = 'img/c_global.png'
    print('READY -> Checking if chat is ready')
    focus('scum')
    sleep()
    openTab()
    if(not onScreen('img/c_stumm.png')):
        pyautogui.press('t')
        sleep()
        pyautogui.hotkey('ctrl', 'a')
        pyautogui.press('del')
    if(onScreen('img/c_stumm.png') and not onScreen(imgChat, bw=False)):
        while(not onScreen(imgChat, bw=False)):
            pyautogui.press('tab')
            sleep(0.5)
        return True
    if(onScreen('img/c_stumm.png') and onScreen(imgChat, bw=False)):
        pyautogui.hotkey('ctrl', 'a')
        pyautogui.press('del')
        print('READY -> Chat is ready')
        return True
    return False


def loading():
    count = 0
    time.sleep(1)
    print('LOADING -> Waiting till done')
    while(onScreen('img/laden.png')):
        count = count + 1
        time.sleep(0.5)
    print('LOADING -> Done, took ' + str(count/2) + ' seconds')
    time.sleep(0.05)


def dragInv():
    ist = onScreen('img/invDrag.png')
    soll = onScreen('img/invDrag_to.png')
    if(ist.y < (soll.y - 20) or ist.y > (soll.y + 20)):
        pyautogui.moveTo(ist)
        sleep()
        pyautogui.mouseDown()
        sleep()
        pyautogui.moveTo(soll, duration=0.5)
        sleep()
        pyautogui.mouseUp()
        sleep()
    centerMouse()
    return True


def openTab():
    if(onScreen('img/inventar.png')):
        if(onScreen('img/invDrag.png')):
            dragInv()
        return True
    pyautogui.keyDown('tab')
    sleep(0.01)
    pyautogui.keyUp('tab')
    pyautogui.press('1')
    if(not onScreen('img/inventar.png')):
        return False
    if(onScreen('img/invDrag.png')):
        dragInv()
    return True


def sendChat(msg):
    if (not onScreen('img/c_global.png')):
        ready()
    pyautogui.hotkey('ctrl', 'a')
    pyautogui.press('del')
    keyboard.write(str(msg))
    pyautogui.press('enter')
    print('CHAT -> Sent: ' + str(msg))
    if(msg.lower().startswith('#teleport')):
        loading()
        ready()
    return True
