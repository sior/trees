#!/usr/bin/python2
import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)
GPIO.setup(12, GPIO.OUT)
GPIO.setup(13, GPIO.OUT)
GPIO.setup(15, GPIO.OUT)

GPIO.output(12, 0)
GPIO.output(13, 1)
GPIO.output(15, 1)
GPIO.output(11, 1)

time.sleep(1)

GPIO.output(12, 0)
GPIO.output(13, 0)
GPIO.output(15, 0)
GPIO.output(11, 0)
