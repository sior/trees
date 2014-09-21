import cherrypy
import os, os.path
from subprocess import call

class Server(object):
    @cherrypy.expose
    def index(self):
        page = open('index.html', 'r').read()
        return page % (1, 2, 3, 4, 5, 6, 7, 8, 9)
    
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
