export class MySocket {
    private wsServer = null;

    public init(server, socket) {
        const WebSocketServer = socket.server;
        this.wsServer = new WebSocketServer({
            httpServer: server
        });
    }
    
    public connect(_callback) {
        this.wsServer.on('request', function(request) {
            let connection = request.accept(null, request.origin);
            _callback(connection);
        });
    };
}