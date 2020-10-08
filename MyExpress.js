const http = require('http');
const url = require('url');

const routing = require('./Routing');

//coockies, accept, host = req.headers
//url = req.url
//query = url.parser(req.url, true).query

const MyExpress = {
    listen: (port, __callback) => {
        http.createServer((req, res) => {
            route = routing.routing(req.url, req.method)
            if(route.path == '*')
                return route.functions[0](req, res);
            req.params = route.getParams(req.url);

            //Running mv if there is eny
            MyExpress.next = (new Cursor(req, res, route.functions)).process
            MyExpress.next(req, res);
            //route.functions[0](req, res);
        }).listen(port);
    }, 
    get: (path, ...args) => routing.add("GET", path, ...args),
    post: (path, ...args) => routing.add("POST", path, ...args)
}

function Cursor(req, res, args, index = 0) {
    this.process = () => {
        args[index++](req, res, MyExpress.next)
    }
}
 
module.exports = MyExpress;