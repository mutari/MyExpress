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
            
            con.on('message', (data) => {
                let path = data.utf8Data.split(' ')[0];
                data = {
                    path: path,
                    data: data.utf8Data.split(' ').slice(1).join(' ');
                }
                this.socketRoutes.forEach(r => {
                    if(r.path == path)
                        r.func(data)
                })
            })

            con.on('close', this.funcClose);

        });
    };

    public on(path: string, _callback: Function) {
        this.socketRoutes.push({path: path, func: _callback});
    }

    public close(_callback: Function) {
        this.funcClose = _callback;
    }
}

export = MySocket;