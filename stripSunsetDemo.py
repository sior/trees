#!/usr/bin/python2
import smbus
bus = smbus.SMBus(1)
bus.write_byte(0x40, 0x07)
