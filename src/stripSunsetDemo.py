#!/usr/bin/python2
import smbus
import time
bus = smbus.SMBus(1)
bus.write_byte(0x40, 0x07)
logFile = open("/var/log/strip.log", "a")
logFile.write(time.strftime("%d/%m/%Y %H:%M:%S strip sunsetDemo\n"))
logFile.close()