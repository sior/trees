#!/usr/bin/python2
import re
import urllib2
from subprocess import call

riseTemplate = '''
[Unit]
Description=Triggers sunrise

[Timer]
OnBootSec=10min

OnCalendar=*-*-* %02d:%02d
Unit=stripSunrise.service

[Install]
WantedBy=multi-user.target
'''
setTemplate = '''
[Unit]
Description=Triggers sunset

[Timer]
OnBootSec=10min

OnCalendar=*-*-* %02d:%02d
Unit=stripSunset.service

[Install]
WantedBy=multi-user.target
'''

call(['systemctl', 'disable', 'stripSunrise.timer'])
call(['systemctl', 'disable', 'stripSunset.timer'])
call(['systemctl', 'stop', 'stripSunrise.timer'])
call(['systemctl', 'stop', 'stripSunset.timer'])

url = "http://www.gaisma.com/en/location/monroeville-pennsylvania.html"
dataFile = urllib2.urlopen(url)
data = dataFile.read()
results = re.compile("<td class=\"sdlh\">Today</td>\n<td class=\"sunshine\">(?:<i>){0,1}(\d\d):(\d\d)(?:</i>){0,1}</td>\n<td class=\"sunshine\">(?:<i>){0,1}(\d\d):(\d\d)(?:</i>){0,1}</td>").search(data)
sunriseHour = int(results.group(1))
sunriseMinute = int(results.group(2))
sunsetHour = int(results.group(3))
sunsetMinute = int(results.group(4))

sunsetFile = open("/etc/systemd/system/stripSunset.timer", w)
sunriseFile = open("/etc/systemd/system/stripSunrise.timer", w)
sunsetFile.write(setTemplate % (sunsetHour, sunsetMinute))
sunriseFile.write(riseTemplate % (sunriseHour, sunriseMinute))
sunsetFile.close()
sunriseFile.close()

call(['systemctl', 'enable', 'stripSunrise.timer'])
call(['systemctl', 'enable', 'stripSunset.timer'])
call(['systemctl', 'start', 'stripSunrise.timer'])
call(['systemctl', 'start', 'stripSunset.timer'])
