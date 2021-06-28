from plugins import scb


def process():
    scope = input('Scope: ')
    scb.doPrint(scope)
    
    if(scope.lower() == 'global'):
        scb.goScope('global')
    elif(scope.lower() == 'local'):
        scb.goScope('local')
    else:
        msg = input('No scope for message\n')

    msg = input('Message: ')
    scb.doPrint(msg)
    scb.sendMessage(msg)
