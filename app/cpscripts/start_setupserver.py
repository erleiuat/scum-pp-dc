import win32con
import win32gui
import make_break
import keyboard
import pyautogui
import time

path = './app/cpscripts/img/'
acDelay = 0.5
wrDelay = 1


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
                return True
        return False
    except:
        return False


def isLoading():
    time.sleep(1)
    loading = pyautogui.locateCenterOnScreen(
        path + 'laden.png', grayscale=True, confidence=0.9)
    while(loading):
        time.sleep(0.5)
        loading = pyautogui.locateCenterOnScreen(
            path + 'laden.png', grayscale=True, confidence=0.9)
    time.sleep(2)


def doTeleport(to):
    time.sleep(acDelay)
    keyboard.send('t')
    time.sleep(acDelay)
    keyboard.write(to)
    time.sleep(wrDelay)
    keyboard.send('enter')
    isLoading()


def lightUp(tp):
    doTeleport(tp)
    time.sleep(acDelay)
    keyboard.send('t')
    time.sleep(acDelay)
    keyboard.write('#SpawnItem Wooden_Plank 2')
    time.sleep(wrDelay)
    keyboard.send('enter')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    pyautogui.keyDown('tab')
    time.sleep(0.01)
    pyautogui.keyUp('tab')
    time.sleep(acDelay)

    fackel = pyautogui.locateCenterOnScreen(
        path + 'startup/fackel.png', grayscale=True, confidence=0.9)
    pyautogui.moveTo(fackel)
    pyautogui.click(button='right')
    time.sleep(acDelay)
    i = 0
    canSch = pyautogui.locateCenterOnScreen(
        path + 'startup/schueren.png', grayscale=True, confidence=0.9)

    while(i < 2):
        pyautogui.moveTo(canSch)
        pyautogui.click()
        time.sleep(3)
        pyautogui.moveTo(fackel)
        pyautogui.click(button='right')
        time.sleep(acDelay)
        i = i + 1

    pyautogui.moveTo(fackel)
    pyautogui.click(button='right')
    time.sleep(acDelay)
    canLight = pyautogui.locateCenterOnScreen(
        path + 'startup/anzuenden.png', grayscale=True, confidence=0.9)
    if(canLight):
        pyautogui.moveTo(canLight)
        pyautogui.click()
        time.sleep(3)
        keyboard.send('esc')
        time.sleep(acDelay)
    else:
        keyboard.send('esc')
        time.sleep(acDelay)
        keyboard.send('esc')
        time.sleep(acDelay)


def doSetup():
    focus('scum')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)

    doTeleport('#Teleport -117351 -66117 37064')

    time.sleep(acDelay)
    keyboard.send('t')
    time.sleep(acDelay)
    keyboard.write('#SpawnItem Lighter')
    time.sleep(wrDelay)
    keyboard.send('enter')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    pyautogui.keyDown('tab')
    time.sleep(0.01)
    pyautogui.keyUp('tab')
    time.sleep(acDelay)
    keyboard.send('1')
    time.sleep(acDelay)

    time.sleep(acDelay)
    pyautogui.doubleClick(pyautogui.locateCenterOnScreen(
        path + 'startup/lighter.png', grayscale=True, confidence=0.9))

    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)

    lightUp('#Teleport -116830 -65759 37064')
    lightUp('#Teleport -117327 -66464 37064')
    lightUp('#Teleport -117317 -66969 37064')
    lightUp('#Teleport -116318 -66427 37064')

    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    make_break.doBreak()


if __name__ == '__main__':
    doSetup()
