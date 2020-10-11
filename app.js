console.clear();
const app = require('./src/MyExpress');
const WebSocketServer = require('websocket');

app.init();

app.set('socket', WebSocketServer);

//set up socket
app.socket.connect((con) => {
    console.log(con);
})

app.get('/', (req, res, next) => {
    console.log('index', res);
    res.sendFile('public/index.html')
    res.end("index " + req.test);
});

app.get('/path', (req, res) => {
    res.end("path")
});

app.get('/name/:name', (req, res) => {
    res.end("Hello: " + req.params.name + ", " + req.query.age);
});

app.get('/book/:name/user/:username', (req, res) => {
    res.end(`Book: ${req.params.name}, user: ${req.params.username}`);
})

app.listen(8000, (err) => {
    if(err) console.error(err);
    else console.log('server started and running on port 8000');
});