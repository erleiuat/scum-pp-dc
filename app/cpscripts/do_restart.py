import subprocess
import os

fullBatPath = os.path.dirname(os.path.realpath(__file__))


print(' -> Killing running processes')
subprocess.call([fullBatPath + '\\use\\restart.bat'])
