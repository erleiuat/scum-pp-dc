from use import scb
from use import control
import json


def doIt():
    return control.getMap()


if __name__ == '__main__':
    print(json.dumps(doIt()))
