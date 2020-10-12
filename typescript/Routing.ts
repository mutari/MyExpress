enum METHOD {
    POST,
    GET,
    ALL
}

export class Routing {

    public static METHOD = METHOD;

    private routes = [{
        method: METHOD.ALL,
        path: '*',
        functions: [(req, res) => {
            res.writeHead(404),
            res.write('The path you whant ti dos not exist???');
            res.end();
        }],
        getParams: null
    }]

    /**
     * adds routes to the routes array
     * @param {string} method the method of the url to add
     * @param {string} path the path of the url to add
     * @param  {...functions} args midelware and end funktions to call 
     */
    public add(method: METHOD, path: string, ...args) {
        if(path == "*") {
            this.routes[0] = {
                method: METHOD.ALL,
                path: '*',
                functions: args,
                getParams: null
            }
            return
        }
        this.routes.push(
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
    public routing(path: string, method: METHOD) {
        path = path.split('?')[0];
        console.log(path);
        for(var route = 0; route < this.routes.length; route++) 
            if(this.matchRoute(path, this.routes[route].path) && this.routes[route].method == method) 
                return this.routes[route];
        return this.routes[0];
    }

    private matchRoute(path, route) {
        path = path.split('/').slice(1);
        route = route.split('/').slice(1);
        if(path.length != route.length)
            return false;
        for(var i = 0; i < path.length; i++) {
            if(path[i] != this.ifParamTransParam(path[i], route[i]))
                return false;
        }
        return true;
    }
    
    private ifParamTransParam(pathParam, routeParam) {
        if(routeParam.slice(0, 1) == ':')
            return pathParam;
        return routeParam;
    }

}





function getParams(path, route = this.path) {
    path = path.split('?')[0];
    path = path.split('/').slice(1);
    route = route.split('/').slice(1);
    let params = {}
    for(var i = 0; i < path.length; i++) {
        if(route[i].slice(0, 1) == ':')
            params[route[i].slice(1)] = path[i];
    }
    return params;
}