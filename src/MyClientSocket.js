class MyClientSocket {
    constructor(address, port = 80) {
        this.socketRoutes = [];
        this.WebSocket = new WebSocket(`ws://${address}:${port}/`);
        this.WebSocket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            this.socketRoutes.forEach(r => {
                if (r.path == data.path)
                    r.callback(data);
            });
        };
    }
    connect(_callback) {
        this.WebSocket.onopen = () => {
            _callback();
        };
    }
    listen(path, _callback) {
        this.socketRoutes.push({ path: path, callback: _callback });
    }
    send(path, data) {
        this.WebSocket.send(JSON.stringify({ path: path, data: data }));
    }
}
//# sourceMappingURL=MyClientSocket.js.map