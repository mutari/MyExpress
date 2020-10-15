class MySocket {

    private socketRoutes = []
    private funcClose;

    private wsServer = null;

    constructor(server, socket) {
        const WebSocketServer = socket.server;
        this.wsServer = new WebSocketServer({
            httpServer: server
        });
    }
    
    public connect(_callback: Function) {
        this.wsServer.on('request', (request) => {

            let con = request.accept(null, request.origin);
            /*
            con.send = function(path: string, data: string) {
                
            }*/
            
            con.on('message', (data) => {
                data = JSON.parse(data.utf8Data);
                console.log(data);
                this.socketRoutes.forEach(r => {
                    if(r.path == data.path)
                        r.func(con, data)
                })
            })

            con.on('close', this.funcClose);

        });
    };

    public send(path: string, data: string) {
        
    }

    public on(path: string, _callback: Function) {
        this.socketRoutes.push({path: path, func: _callback});
    }

    public close(_callback: Function) {
        this.funcClose = _callback;
    }
}

export = MySocket;