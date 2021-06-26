from plugins import scb
import pyautogui


def process():
    scope = input('Scope: ')
    print(scope)

    if(scope.lower() == 'global'):
        scb.goScope('global')
    elif(scope.lower() == 'local'):
        scb.goScope('local')
    else:
        msg = input('No scope for message\n')

    msg = input('Message: ')
    print(msg)
    scb.sendMessage(msg)
