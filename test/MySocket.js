"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySocket = void 0;
class MySocket {
    constructor() {
        this.wsServer = null;
    }
    init(server, socket) {
        const WebSocketServer = socket.server;
        this.wsServer = new WebSocketServer({
            httpServer: server
        });
    }
    connect(_callback) {
        this.wsServer.on('request', function (request) {
            let connection = request.accept(null, request.origin);
            _callback(connection);
        });
    }
    ;
}
exports.MySocket = MySocket;
//# sourceMappingURL=MySocket.js.map