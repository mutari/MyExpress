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
            const connectionOBJ = {
                send: (path, data) => {
                    con.send(JSON.stringify({ path: path, data: data }));
                }
            };
            con.on('message', (data) => {
                data = JSON.parse(data.utf8Data);
                this.socketRoutes.forEach(r => {
                    if (r.path == data.path)
                        r.func(data, connectionOBJ);
                });
            });
            con.on('close', this.funcClose);
        });
    }
    ;
    send(path, data) {
        this.wsServer.send(JSON.stringify({ path: path, data: data }));
    }
    on(path, _callback) {
        this.socketRoutes.push({ path: path, func: _callback });
    }
    close(_callback) {
        this.funcClose = _callback;
    }
}
module.exports = MySocket;
//# sourceMappingURL=MySocket.js.map