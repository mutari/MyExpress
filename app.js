console.clear();
const MyExpress = require('./test/MyExpress');
console.log(MyExpress)
const app = new MyExpress();
const WebSocketServer = require('websocket');

app.set('socket', WebSocketServer);

//set up socket
app.socket.connect((con) => {
    console.log(con);
})

app.get('/', (req, res, next) => {
    console.log('index', typeof res.end);
    res.sendFile('public/index.html')
    res.end("index " + req.query.test);
});

app.get('/path', (req, res) => {
    let obj = res;

    console.log(obj.end)

    res.end("path");
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