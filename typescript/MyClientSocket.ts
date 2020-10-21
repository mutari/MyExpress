class MyClientSocket {

    private WebSocket;
    private socketRoutes = [];

    constructor(address:string, port = 80) {
        this.WebSocket = new WebSocket(`ws://${address}:${port}/`);
        this.WebSocket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            this.socketRoutes.forEach(r => {
                if(r.path == data.path)
                    r.callback(data)
            })
        }
    }

    public connect(_callback: Function) {
        this.WebSocket.onopen = () => {
            _callback();
        }
    }

    public listen(path: string, _callback: Function) {
        this.socketRoutes.push({path: path, callback: _callback});
    }

    public send(path: string, data: string) {
        this.WebSocket.send(JSON.stringify({path: path, data: data}));
    }

}