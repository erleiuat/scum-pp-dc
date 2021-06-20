import pyautogui
import time
import win32clipboard

textfield = pyautogui.locateCenterOnScreen('./app/cpscripts/test/stumm.png')

pyautogui.moveTo(textfield)
pyautogui.move(0, -40)
pyautogui.scroll(-100)
pyautogui.click()
pyautogui.hotkey('ctrl', 'a')
pyautogui.hotkey('ctrl', 'c')
pyautogui.hotkey('alt', 'tab', 'tab')

win32clipboard.OpenClipboard()
data = win32clipboard.GetClipboardData()
win32clipboard.CloseClipboard()
print(data)
