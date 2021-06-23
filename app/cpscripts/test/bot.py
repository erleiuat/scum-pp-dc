import multiprocessing
import os
import psutil
import time

import subprocess
import signal
import time
import os
import shutil

"""
original = 'D:/Games/steamapps/common/SCUM/SCUM/Binaries/Win64/SCUM.exe'
target = 'D:/Games/steamapps/common/SCUM/SCUM/Binaries/Win64/SCUM_3.exe'

shutil.copyfile(original, target)

process1 = subprocess.Popen(['D:/Games/steamapps/common/SCUM/SCUM/Binaries/Win64/SCUM_3.exe'],
                cwd='D:/Games/')

psProcess = psutil.Process(pid=process1.pid)
time.sleep(60)
psProcess.suspend()



process2 = Popen(['D:/Games/steamapps/common/SCUM/SCUM/Binaries/Win64/SCUM.exe'],
                cwd='D:/Games/', stdout=PIPE, stderr=PIPE)
process3 = Popen(['D:/Games/steamapps/common/SCUM/SCUM/Binaries/Win64/SCUM.exe'],
                cwd='D:/Games/', stdout=PIPE, stderr=PIPE)
stdout, stderr = process1.communicate()

stdout, stderr = process2.communicate()
stdout, stderr = process3.communicate()
print (stdout)
"""
def processRunning(processName):
    for proc in psutil.process_iter():
        try:
            if (processName.lower() in proc.name().lower()):
                return psutil.Process(pid=proc.pid)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return False


process1 = subprocess.Popen(['D:/Games/steamapps/common/SCUM/SCUM_Launcher.exe'])

time.sleep(2)
parent = processRunning('anticheat')
children = parent.children(recursive=True)
print(children)
#psProcess = psutil.Process(pid=p.pid)
#psProcess.suspend()

"""
p = processRunning('scum')
p.suspend()
"""
