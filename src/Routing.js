const routes = [{
    method: "ALL",
    path: '*', 
    functions: [(req, res) => {
        res.writeHead(404);
        res.write('The path you whent to dos not exist??');
        res.end();
    }]
}];

/**
 * adds routes to the routes array
 * @param {string} method the method of the url to add
 * @param {string} path the path of the url to add
 * @param  {...functions} args midelware and end funktions to call 
 */
function add(method, path, ...args) {
    if(path == "*") {
        routes[0] = {
            method: "ALL",
            path: '*',
            functions: args
        }
        return
    }
    routes.push(
    {
        method: method,
        path: path,
        functions: args,
        getParams: getParams

    });
}

/**
 * What route to route to
 * @param {string} path request path
 * @param {string} method request method
 */
function routing(path, method) {
    path = path.split('?')[0];
    console.log(path);
    for(var route = 0; route < routes.length; route++) 
        if(matchRoute(path, routes[route].path) && routes[route].method == method) 
            return routes[route];
    return routes[0];
}

function matchRoute(path, route) {
    path = path.split('/').slice(1);
    route = route.split('/').slice(1);
    if(path.length != route.length)
        return false;
    for(var i = 0; i < path.length; i++) {
        if(path[i] != ifParamTransParam(path[i], route[i]))
            return false;
    }
    return true;
}

function ifParamTransParam(pathParam, routeParam) {
    if(routeParam.slice(0, 1) == ':')
        return pathParam;
    return routeParam;
}

function getParams(path, route = this.path) {
    path = path.split('?')[0];
    path = path.split('/').slice(1);
    route = route.split('/').slice(1);
    params = {}
    for(var i = 0; i < path.length; i++) {
        if(route[i].slice(0, 1) == ':')
            params[route[i].slice(1)] = path[i];
    }
    return params;
}

module.exports = {
    add: add,
    routing: routing
}