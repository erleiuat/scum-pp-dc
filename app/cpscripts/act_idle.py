from use import scb


def doIt():
    scb.idlePos()


if __name__ == '__main__':
    scb.sendChat('#SetFakeName [SF-BOT][IDLE]')
    scb.sleep()
    doIt()
    scb.sleep()
    scb.sendChat('#ClearFakeName')
