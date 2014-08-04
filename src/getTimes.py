#!/usr/bin/python2
import re
import urllib2

url = "http://www.gaisma.com/en/location/monroeville-pennsylvania.html"
dataFile = urllib2.urlopen(url)
data = dataFile.read()
results = re.compile("<td class=\"sdlh\">Today</td>\n<td class=\"sunshine\">(?:<i>){0,1}(\d\d):(\d\d)(?:</i>){0,1}</td>\n<td class=\"sunshine\">(?:<i>){0,1}(\d\d):(\d\d)(?:</i>){0,1}</td>").search(data)
sunriseHour = int(results.group(1))
sunriseMinute = int(results.group(2))
sunsetHour = int(results.group(3))
sunsetMinute = int(results.group(4))

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
print riseTemplate % (sunriseHour, sunriseMinute)
print setTemplate % (sunsetHour, sunsetMinute)
