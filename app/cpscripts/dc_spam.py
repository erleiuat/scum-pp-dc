import webbrowser
import pyautogui
import time
from tkinter import Tk
import os
import sys
import keyboard

path = './app/cpscripts/'


def sendMsg():
    pyautogui.keyDown('ctrl')
    pyautogui.press('a')
    pyautogui.keyUp('ctrl')
    pyautogui.press('del')

    r = Tk()
    r.withdraw()
    r.clipboard_clear()
    r.clipboard_append(open(path+'spam.txt', 'r').read())
    pyautogui.keyDown('ctrl')
    pyautogui.press('v')
    pyautogui.keyUp('ctrl')
    time.sleep(0.5)
    pyautogui.press('enter')


def doLogin(mail, pw):
    pyautogui.keyDown('ctrl')
    pyautogui.press('a')
    pyautogui.keyUp('ctrl')
    pyautogui.press('del')
    keyboard.write(mail)
    pyautogui.press('tab')
    pyautogui.keyDown('ctrl')
    pyautogui.press('a')
    pyautogui.keyUp('ctrl')
    pyautogui.press('del')
    keyboard.write(pw)
    pyautogui.press('enter')
    time.sleep(5)


mail = sys.argv[1]
pw = 'Tr5A@wPFtv'

webbrowser.open(
    'https://discord.com/channels/837074161389142066/853723662347665410')
time.sleep(5)

doLogin(mail, pw)
time.sleep(0.5)
sendMsg()
time.sleep(0.5)
pyautogui.keyDown('ctrl')
pyautogui.press('w')
pyautogui.keyUp('ctrl')
time.sleep(0.5)
webbrowser.open(
    'https://discord.com/channels/837074161389142066/853723703052075009')
time.sleep(5)
sendMsg()
time.sleep(0.5)

setting = pyautogui.locateCenterOnScreen(
    path + 'img/dc/setting.PNG', grayscale=False, confidence=0.9)
pyautogui.moveTo(setting)
pyautogui.click()
time.sleep(0.5)
sidebar = pyautogui.locateCenterOnScreen(
    path + 'img/dc/sidebar.PNG', grayscale=False, confidence=0.9)
pyautogui.moveTo(sidebar)
time.sleep(0.5)
pyautogui.scroll(-5000)
time.sleep(0.5)
logout1 = pyautogui.locateCenterOnScreen(
    path + 'img/dc/logout1.PNG', grayscale=False, confidence=0.9)
pyautogui.moveTo(logout1)
pyautogui.click()
time.sleep(0.5)
pyautogui.press('enter')
time.sleep(3)
pyautogui.keyDown('ctrl')
pyautogui.press('w')
pyautogui.keyUp('ctrl')
time.sleep(0.5)