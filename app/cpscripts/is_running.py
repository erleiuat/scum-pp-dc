from use import scb
import psutil


def processRunning(processName):
    for proc in psutil.process_iter():
        try:
            if (processName.lower() in proc.name().lower()):
                return True
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return False


if(not scb.ready()):
    if (not processRunning('scum')):
        raise Exception('Scum not running')
    else:
        raise Exception('Not ingame or on server')
