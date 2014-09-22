import cherrypy
import os, os.path
from subprocess import call

class Server(object):
    @cherrypy.expose
    def index(self):
	timeData = open('/var/log/stripTime.log', 'r').readlines()
        page = open('index.html', 'r').read()
        page =  page % (int(timeData[0]), int(timeData[1]), int(timeData[2]), int(timeData[3]), timeData[4])
	return page
 
    @cherrypy.expose
    def stripOn(self):
        call(['stripOn'])
        return 'stripOn'

    @cherrypy.expose
    def stripOff(self):
        call(['stripOff'])
        return 'stripOff'

    @cherrypy.expose
    def stripSunrise(self):
        call(['stripSunrise'])
        return 'stripSunrise'

    @cherrypy.expose
    def stripSunset(self):
        call(['stripSunset'])
        return 'stripSunset'

    @cherrypy.expose
    def stripSunriseDemo(self):
        call(['stripSunriseDemo'])
        return 'stripSunriseDemo'

    @cherrypy.expose
    def stripSunsetDemo(self):
        call(['stripSunsetDemo'])
        return 'stripSunsetDemo'

    @cherrypy.expose
    def stripCloud(self):
        call(['stripCloud'])
        return 'stripCloud'

if __name__ == '__main__':
    conf = {'/':{'tools.staticdir.root' : os.path.abspath(os.getcwd())},
            '/static':{'tools.staticdir.on' : True,
                       'tools.staticdir.dir' : '.'}
            }
    cherrypy.config.update({'server.socket_host': '0.0.0.0',
                            'server.socket_port': 80,})
    cherrypy.quickstart(Server(), '/', conf)
