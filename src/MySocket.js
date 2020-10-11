module.exports = {
    init: init,
    connect: connect
}

let wsServer = null;
function init(server, socket) {
    const WebSocketServer = socket.server;
    wsServer = new WebSocketServer({
        httpServer: server
    });
}

function connect(_callback) {
    wsServer.on('request', function(request) {
        connection = request.accept(null, request.origin);
        _callback(connection);
    });
};