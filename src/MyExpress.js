"use strict";
const http = require('http'), url = require('url'), fs = require('fs'), path = require('path');
const Routing = require('./Routing'), Socket = require('./MySocket'), MyResponse = require('./Response');
class MyExpress {
    constructor() {
        this.routing = new Routing();
        this.server = http.createServer((req, res) => {
            MyResponse.response = res;
            MyResponse.request = req;
            res = Object.assign(res, this.addResponsFunctions());
            let route = this.routing.routing(req.url, req.method);
            if (route.path == '*')
                return route.functions[0](req, res);
            req.params = route.getParams(req.url);
            req.query = url.parse(req.url, true).query;
            //Running mv if there is eny
            MyExpress.next = (new Cursor(req, res, route.functions)).process;
            MyExpress.next(req, res);
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
        }
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
        args[index++](req, res, MyExpress.next);
    };
}
module.exports = MyExpress;
//# sourceMappingURL=MyExpress.js.map