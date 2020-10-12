const http = require('http'), url = require('url'), fs = require('fs'), path = require('path');
const routing = require('./Routing'), socket = require('./MySocket'), response = require('./Response');
class MyExpress {
    constructor() {
        this.server = http.createServer(function (res, req) {
            res = Object.assign(res, response);
            console.log("test");
            let route = routing.routing(req.url, req.method);
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
        routing.add("GET", path, ...args);
    }
    post(path, ...args) {
        routing.add("POST", path, ...args);
    }
    set(named, functions) {
        if (named == 'socket') {
            socket.init(this.server, functions);
            this.socket = socket;
        }
    }
}
function Cursor(req, res, args, index = 0) {
    this.process = () => {
        args[index++](req, res, MyExpress.next);
    };
}
//# sourceMappingURL=MyExpress.js.map