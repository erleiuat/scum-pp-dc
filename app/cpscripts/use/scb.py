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


def mouseReady():
    pyautogui.move(0, 0)


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


def ready(chat='global', once=False, failsafe=True):
    print('READY -> Checking if chat is ready')
    imgChat = 'img/c_global.png'
    if(chat != 'global'):
        return False
    focus('scum')
    sleep()
    if(not onScreen(imgChat, bw=False) and not onScreen('img/c_stumm.png')):
        pyautogui.press('t')
        sleep()
    if(not onScreen(imgChat, bw=False)):
        sleep()
        if(onScreen('img/c_stumm.png')):
            while(not onScreen(imgChat, bw=False)):
                pyautogui.press('tab')
                sleep(1)
        elif(onScreen('img/spiel_fortsetzen.png')):
            pyautogui.press('esc')
            sleep()
            pyautogui.press('t')
            if(not once):
                return ready(once=True, failsafe=failsafe)
            elif(failsafe):
                raise Exception('Game not ready')
            else:
                return False
        else:
            sleep(5)
            if(not once):
                return ready(once=True, failsafe=failsafe)
            elif(failsafe):
                raise Exception('Game not ready')
            else:
                return False

    pyautogui.hotkey('ctrl', 'a')
    pyautogui.press('del')
    print('READY -> Chat is ready')
    return True


def loading():
    count = 0
    time.sleep(1)
    print('LOADING -> Waiting till done')
    while(onScreen('img/laden.png')):
        count = count + 1
        time.sleep(0.5)
    print('LOADING -> Done, took ' + str(count/2) + ' seconds')
    time.sleep(0.05)


def openTab(menu=1):
    if(not onScreen('img/startup/inventar.png')):
        ready()
        pyautogui.press('esc')
        sleep()
        pyautogui.keyDown('tab')
        sleep(0.01)
        pyautogui.keyUp('tab')
        sleep()
        pyautogui.press(str(menu))


def sendChat(msg, wait=False, safe=False, chat='global'):
    if (safe and not ready(chat)):
        return False
    if(wait):
        sleepLong()
    pyautogui.hotkey('ctrl', 'a')
    pyautogui.press('del')
    keyboard.write(str(msg))
    pyautogui.press('enter')
    print('CHAT -> Sent: ' + str(msg))
    if(msg.lower().startswith('#teleport')):
        loading()
        openTab()
        ready()
    return True
