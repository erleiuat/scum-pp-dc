import time
import win32con
import keyboard
import win32gui
import sys


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


focus("scum")
time.sleep(0.2)
keyboard.send("esc")
time.sleep(0.05)
keyboard.send("t")
time.sleep(0.05)
keyboard.send("backspace")
time.sleep(0.05)
del sys.argv[0]
count = 0
for x in sys.argv:
    keyboard.write(x)
    time.sleep(0.05)
    keyboard.send("enter")
    count = count + 1
    if(count >= 2):
        time.sleep(0.8)
    else:
        time.sleep(0.05)

keyboard.send("esc")
time.sleep(0.05)
keyboard.send("esc")
