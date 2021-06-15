from use import scb
import pyautogui


def deposit():
    scb.sleep()


def count():
    scb.sleep()
    scb.sendChat('I will now count what I find',
                 wait=True, safe=True, chat='local')


def confirm():
    scb.sleep()


if __name__ == '__main__':
    count()
