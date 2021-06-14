import win32con
import win32gui
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


def doBreak():
    focus('scum')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)

    doTeleport('#Teleport -117351 -66117 37064')
    time.sleep(acDelay)
    pyautogui.keyDown('tab')
    time.sleep(0.01)
    pyautogui.keyUp('tab')
    time.sleep(acDelay)
    keyboard.send('1')
    time.sleep(acDelay)

    keyboard.send('t')
    time.sleep(acDelay)
    keyboard.write('#SpawnItem Milk 1')
    time.sleep(wrDelay)
    keyboard.send('enter')
    time.sleep(acDelay)
    keyboard.write('#SpawnItem Sugar')
    time.sleep(wrDelay)
    keyboard.send('enter')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)

    milk = pyautogui.locateCenterOnScreen(
        path + 'startup/milk.png', grayscale=True, confidence=0.9)
    while(milk):
        time.sleep(acDelay)
        pyautogui.moveTo(milk)
        pyautogui.click(button='right')
        time.sleep(acDelay)
        drink = pyautogui.locateCenterOnScreen(
            path + 'startup/trinken.png', grayscale=True, confidence=0.9)
        time.sleep(acDelay)
        pyautogui.moveTo(drink)
        pyautogui.click()
        time.sleep(52)
        milk = pyautogui.locateCenterOnScreen(
            path + 'startup/milk.png', grayscale=True, confidence=0.9)

    sugar = pyautogui.locateCenterOnScreen(
        path + 'startup/sugar.png', grayscale=True, confidence=0.9)
    time.sleep(acDelay)
    pyautogui.moveTo(sugar)
    pyautogui.click(button='right')
    time.sleep(acDelay)
    eat = pyautogui.locateCenterOnScreen(
        path + 'startup/essen.png', grayscale=True, confidence=0.9)
    time.sleep(acDelay)
    pyautogui.moveTo(eat)
    pyautogui.click()
    time.sleep(110)

    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    doTeleport('#Teleport -117114.336 -66718.719 37064.668')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)


if __name__ == '__main__':
    focus('scum')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    keyboard.send('t')
    time.sleep(acDelay)
    keyboard.write('BOT WILL TAKE A SMALL BREAK (about 5 minutes)')
    time.sleep(wrDelay)
    keyboard.send('enter')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    doBreak()
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    keyboard.send('t')
    time.sleep(acDelay)
    keyboard.write('BOT IS BACK FROM BREAK')
    time.sleep(wrDelay)
    keyboard.send('enter')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
    keyboard.send('esc')
    time.sleep(acDelay)
