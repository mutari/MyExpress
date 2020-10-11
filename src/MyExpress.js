const   http = require('http'),
        url = require('url'),
        fs = require('fs'),
        path = require('path');


const   routing = require('./Routing'),
        socket = require('./MySocket'),
        Response = require('./Response');

//coockies, accept, host = req.headers
//url = req.url
//query = url.parser(req.url, true).query

const MyExpress = {
    init: () => {
        MyExpress.server = http.createServer((req, res) => {

            res = {...Response, ...res};

            route = routing.routing(req.url, req.method)
            if(route.path == '*')
                return route.functions[0](req, res);
            req.params = route.getParams(req.url);
            req.query = url.parse(req.url, true).query;

            //Running mv if there is eny
            MyExpress.next = (new Cursor(req, res, route.functions)).process
            MyExpress.next(req, res);
            //route.functions[0](req, res);
        })
    },
    listen: (port, _callback, options) => {
        try {
            MyExpress.server.listen(port);
            if(_callback) _callback();
        } catch (error) {
            if(_callback) _callback(error)
        }
    }, 
    get: (path, ...args) => routing.add("GET", path, ...args),
    post: (path, ...args) => routing.add("POST", path, ...args),
    set: (named, functions) => {
        if(named == 'socket') {
            socket.init(MyExpress.server, functions);
            MyExpress.socket = socket;
        }
    }
}

function Cursor(req, res, args, index = 0) {
    this.process = () => {
        args[index++](req, res, MyExpress.next)
    }
}
 
module.exports = MyExpress;