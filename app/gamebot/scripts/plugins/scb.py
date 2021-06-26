import win32clipboard
import pyautogui
import keyboard
import time


path = './app/gamebot/scripts/'
currentScope = ''

regions = {
    'scope': (385, 435, 60, 60),
    'loading': (1200, 830, 125, 50),
    'inventory': (405, 0, 630, 900),
    'chat': (20, 70, 415, 400)
}

#Teleport -116369 -65906 37144
#Teleport -81703 38939 68214
#stummScreenRegion = (20, 400, 70, 40)
#roomScreenRegion = (385, 435, 60, 60)
#roomScreenRegion = (380, 400, 440, 440)


def sleep(duration=0.4):
    time.sleep(duration)


def safeMouse():
    pyautogui.moveTo(1200, 820)


def safeClick(x, y, double=False, button='left'):
    pyautogui.moveTo(x, y)
    pyautogui.move(40, 5, duration=0.005)
    pyautogui.move(-40, -5, duration=0.005)
    pyautogui.click(button=button)
    if(double):
        pyautogui.click(button=button)


def goScope(scopeName):
    global currentScope
    if(currentScope == scopeName):
        return True
    isThere = onScreen(
        'img/chat/'+scopeName+'.png',
        region=regions['scope']
    )
    while(not isThere):
        pyautogui.press('tab')
        isThere = onScreen(
            'img/chat/'+scopeName+'.png',
            region=regions['scope']
        )
    currentScope = scopeName


def loading():
    sleep(1)
    while(onScreen('img/scb/laden.png', region=regions['loading'])):
        sleep(0.01)


def openTab():
    while(not onScreen('img/scb/inventar.png', region=regions['inventory'])):
        pyautogui.press('tab')
    sleep(0.01)


def isTeleport():
    loading()
    openTab()
    pyautogui.press('t')


def sendMessage(msg):
    keyboard.write(msg)
    pyautogui.press('enter')
    if(msg.lower().startswith('#teleport')):
        isTeleport()
    else:
        sleep(0.4)


def readMessage():
    chatPos = onScreen('img/chat/stumm.png', region=regions['chat'])
    safeClick(chatPos.x, (chatPos.y - 20))
    pyautogui.hotkey('ctrl','a')
    pyautogui.hotkey('ctrl', 'c')
    safeClick((chatPos.x + 100), chatPos.y)
    win32clipboard.OpenClipboard()
    data = win32clipboard.GetClipboardData()
    win32clipboard.CloseClipboard()
    user = (data[0:(data.find(':'))]).strip()
    message = (data[(data.find(':')+1):]).strip()
    return {
        'user': user, 
        'message': message
    }


def onScreen(img, bw=False, sure=0.99, region=(0,0,1440,900)):
    global path
    isThere = pyautogui.locateCenterOnScreen(
        path + img,
        grayscale=bw,
        confidence=sure,
        region=region
    )
    if(isThere):
        return isThere
    else:
        return False
