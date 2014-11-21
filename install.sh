#!/bin/bash
SRCDIR=./src/
INSDIR=/usr/local/bin/
FILES=( stripCloud stripGetTimes stripOff stripOn stripSunrise stripSunriseDemo stripSunset stripSunsetDemo )
SUFFIX=.py
for FILE in "${FILES[@]}"
do
    cp $SRCDIR$FILE$SUFFIX $INSDIR$FILE
done
