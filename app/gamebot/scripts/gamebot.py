from plugins import focus
import _message
import _action



focus.window('scum')
while (True):
    cmd = input('\nCommand: ')
    print(cmd)

    if(cmd == 'MESSAGE'):
        _message.process()
    elif(cmd == 'ACTION'):
        _action.process()
    else:
        print('Error: Command not recognized\n')
