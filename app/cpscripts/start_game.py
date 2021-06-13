#import start_setupserver
import webbrowser
import subprocess
import pyautogui
import time
import keyboard
import win32con
import win32gui
import os
import sys

# start_setupserver.doSetup()
# sys.exit()

path_bat = os.path.dirname(os.path.realpath(__file__))
path = './app/cpscripts/img/'


def isLoading():
    time.sleep(1)
    loading = pyautogui.locateCenterOnScreen(
        path + 'laden.png', grayscale=True, confidence=0.9)
    while(loading):
        time.sleep(0.5)
        loading = pyautogui.locateCenterOnScreen(
            path + 'laden.png', grayscale=True, confidence=0.9)
    time.sleep(2)


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


def ffahren():
    f_btn = pyautogui.locateOnScreen(
        path+'fortsetzen.png', grayscale=True, confidence=0.9)
    if(not f_btn):
        f_btn = pyautogui.locateOnScreen(
            path+'fortsetzen_2.png', grayscale=True, confidence=0.9)
    if(f_btn):
        # pyautogui.keyDown('ctrl')
        # time.sleep(0.1)
        # pyautogui.press('d')
        # time.sleep(0.1)
        # pyautogui.keyUp('ctrl')
        time.sleep(1)
        tClick = pyautogui.center(f_btn)
        pyautogui.click(tClick.x, tClick.y)
        return True
    return False


def igReady():
    pyautogui.press("t")
    time.sleep(0.5)
    pyautogui.press("backspace")
    time.sleep(0.5)
    c_stumm = pyautogui.locateOnScreen(
        path+'c_stumm.png', grayscale=False, confidence=0.9)
    if(not c_stumm):
        return False
    c_global = False
    while(not c_global):
        time.sleep(1)
        pyautogui.press('tab')
        time.sleep(1)
        c_global = pyautogui.locateOnScreen(
            path+'c_global.png', grayscale=False, confidence=0.9)
    time.sleep(1)
    pyautogui.press("esc")
    time.sleep(0.5)
    pyautogui.press("esc")
    time.sleep(0.5)
    return True


subprocess.call([path_bat+'\kill_steam.bat'])
subprocess.call([path_bat+'\kill_scum.bat'])
webbrowser.open('steam://rungameid/513710')

count = 0
while(not ffahren()):
    if(count > 100):
        raise Exception('Could not start game (1)')
    time.sleep(1)
    focus('scum')
    count = count+1

count = 0
while(not igReady()):
    if(count > 100):
        raise Exception('Could not start game (2)')
    time.sleep(1)
    focus('scum')
    count = count+1

time.sleep(1)
# subprocess.call([path_bat+'\kill_steam.bat'])
time.sleep(1)
time.sleep(1)
pyautogui.press("esc")
time.sleep(0.5)
pyautogui.press("t")
time.sleep(0.5)
pyautogui.press("backspace")
time.sleep(0.5)
keyboard.write('#Teleport -117114.336 -66718.719 37064.668')
time.sleep(0.5)
pyautogui.press("enter")
time.sleep(0.5)
isLoading()
time.sleep(0.5)
pyautogui.press("t")
time.sleep(0.5)
pyautogui.press("backspace")
time.sleep(0.5)
keyboard.write('#ClearFakeName')
time.sleep(0.5)
pyautogui.press("enter")
time.sleep(0.5)
keyboard.write('[SF-BOT IS BACK ONLINE]')
time.sleep(0.5)
pyautogui.press("enter")
time.sleep(0.5)
pyautogui.press("esc")
time.sleep(0.5)
pyautogui.press("esc")
time.sleep(1)
