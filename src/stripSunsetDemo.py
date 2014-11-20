#!/usr/bin/python2
import smbus
import time
done = False
while not done:
    try:
        bus = smbus.SMBus(1)
        bus.write_byte(0x40, 0x07)
        done = True
    except IOError as e:
        done = False
        time.sleep(0.5)
logFile = open("/var/log/strip.log", "a")
logFile.write(time.strftime("%d/%m/%Y %H:%M:%S strip sunsetDemo\n"))
logFile.close()
