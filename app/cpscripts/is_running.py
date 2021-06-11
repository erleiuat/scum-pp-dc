import time
import psutil
import time
import win32con
import win32gui
import sys
import time
import pyautogui
import os

path = './app/cpscripts/img/'


def processRunning(processName):
    for proc in psutil.process_iter():
        try:
            if (processName.lower() in proc.name().lower()):
                return True
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return False


def focus(window_name):
    if(window_name.lower() in win32gui.GetWindowText(win32gui.GetForegroundWindow()).lower()):
        return True

    def window_dict_handler(hwnd, top_windows):
        top_windows[hwnd] = win32gui.GetWindowText(hwnd)

    tw, expt = {}, True
    win32gui.EnumWindows(window_dict_handler, tw)
    for handle in tw:
        if (window_name.lower() in tw[handle].lower()):
            win32gui.ShowWindow(handle, win32con.SW_NORMAL)
            win32gui.BringWindowToTop(handle)
            win32gui.SetForegroundWindow(handle)
            return True
    raise Exception('Window not found')


def inGame():
    focus("scum")
    time.sleep(0.1)
    sf_btn = pyautogui.locateOnScreen(
        path+'spiel_fortsetzen.png', grayscale=True, confidence=0.9)
    time.sleep(0.1)
    if(not sf_btn):
        return False
    pyautogui.press("esc")
    time.sleep(0.1)
    pyautogui.press("t")
    time.sleep(0.1)
    pyautogui.press("backspace")
    time.sleep(0.1)
    c_global = pyautogui.locateOnScreen(
        path+'c_global.png', grayscale=False, confidence=0.9)
    if(not c_global):
        return False
    pyautogui.press("esc")
    time.sleep(0.1)
    pyautogui.press("esc")
    return True


if (not processRunning('scum')):
    raise Exception('Scum not running')

if(not inGame()):
    raise Exception('Not ingame or in correct Chat')
