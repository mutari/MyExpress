console.clear();
const app = require('./MyExpress');

app.get('/', mv, (req, res, next) => {
    console.log('index');
    res.end("index " + req.test);
});

function mv(req, res, next) {
    req.test = "DOG";
    console.log("test mv");
    next();
    console.log("test2 mv");
}

app.get('/path', (req, res) => {
    res.end("path")
});

app.get('/name/:name', (req, res) => {
    res.end("Hello: ");
});

app.get('/name', (req, res) => {
    res.end("Hello!");
});

app.get('/book/:name/user/:username', (req, res) => {
    res.end(`Book: ${req.params.name}, user: ${req.params.username}`);
})

app.listen(8000);