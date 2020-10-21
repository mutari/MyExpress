console.clear();
const MyExpress = require('./src/MyExpress');
const app = new MyExpress();

//setting up socket
const WebSocketServer = require('websocket');

app.set('socket', WebSocketServer);

//set up socket
app.socket.connect((con) => {
    console.log("socket: ");
})

app.socket.on('player', (data, con) => {
    console.log(data.content);
})

app.socket.on('send', (data, con) => {
    console.log("send::", data);
    con.send('hello', 'hello wrold');
})

app.socket.close((close) => {
    console.log("Sombody left: " + close);
})

/*
//seting up global mv
app.use((req, res, next) => {
    console.log('Test')
    next();
})

app.use((req, res, next) => {
    console.log('Test2')
    next();
})
*/

//setting up paths
app.get('/', (req, res, next) => {
    console.log('index', typeof res.end);
    res.sendFile(__dirname + '/public/index.html')
    //res.end("index " + req.query.test);
});

app.post('/test', (req, res) => {
    req.on('data', data => {
        console.log(data.toString());
    })
})

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