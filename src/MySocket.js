"use strict";
class MySocket {
    constructor(server, socket) {
        this.socketRoutes = [];
        this.wsServer = null;
        const WebSocketServer = socket.server;
        this.wsServer = new WebSocketServer({
            httpServer: server
        });
    }
    connect(_callback) {
        this.wsServer.on('request', (request) => {
            let con = request.accept(null, request.origin);
            con.on('message', (data) => {
                let path = data.utf8Data.split(' ')[0];
                data = {
                    path: path,
                    data: data.utf8Data.split(' ').slice(1).join(' ')
                };
                this.socketRoutes.forEach(r => {
                    if (r.path == path)
                        r.func(data);
                });
            });
            con.on('close', this.funcClose);
        });
    }
    ;
    on(path, _callback) {
        this.socketRoutes.push({ path: path, func: _callback });
    }
    close(_callback) {
        this.funcClose = _callback;
    }
}
module.exports = MySocket;
//# sourceMappingURL=MySocket.js.map