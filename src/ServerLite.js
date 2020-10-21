"use strict";
const http = require('http'), url = require('url'), fs = require('fs'), path = require('path');
const Routing = require('./Routing'), Socket = require('./MySocket'), MyResponse = require('./Response');
class ServerLite {
    constructor() {
        this.globalMV = [];
        this.routing = new Routing();
        this.server = http.createServer((req, res) => {
            //set up MyResponse objekt
            MyResponse.response = res;
            res = Object.assign(res, this.addResponsFunctions());
            //route path
            let route = this.routing.routing(req.url, req.method);
            if (route.path == '*')
                return route.functions[0](req, res);
            //add querys and params
            req.params = route.getParams(req.url);
            req.query = url.parse(req.url, true).query;
            let CallStack = [...this.globalMV, ...route.functions];
            //Running mv if there is eny
            ServerLite.next = (new Cursor(req, res, CallStack)).process;
            ServerLite.next(req, res);
            //route.functions[0](req, res);
        });
    }
    listen(port, _callback, options) {
        try {
            this.server.listen(port);
            if (_callback)
                _callback();
        }
        catch (error) {
            if (_callback)
                _callback(error);
        }
    }
    get(path, ...args) {
        this.routing.add("GET", path, ...args);
    }
    post(path, ...args) {
        this.routing.add("POST", path, ...args);
    }
    set(named, functions) {
        if (named == 'socket') {
            this.socket = new Socket(this.server, functions);
            this.get('/MySocket/socket', (req, res, next) => {
                res.sendFile(__dirname + "/MyClientSocket.js");
            });
        }
    }
    use(_callback) {
        this.globalMV.push(_callback);
    }
    addResponsFunctions() {
        return {
            sendFile: MyResponse.sendFile,
            send: MyResponse.send,
            json: MyResponse.json
        };
    }
}
function Cursor(req, res, args, index = 0) {
    this.process = () => {
        args[index++](req, res, ServerLite.next);
    };
}
module.exports = ServerLite;
//# sourceMappingURL=ServerLite.js.map