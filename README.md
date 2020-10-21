# ServerLite

The is a sammal express like server that is built to be easy and light waight. It is mainly bult for beginers but could be useful tool to set up a quick start server or a one page node server.

## hello wrold

```js
const ServerLite = require('./src/ServerLite');
const app = new ServerLite();

app.get('/', (request, response) => {
    response.send('Hello wrold!');
});

app.listen(3000);
```

## Functions

### get

```js
app.get(path, callback)
```

### post

```js
app.post(path, callback)
```

### use
"use" creates a global midelware that runs before routes, all midelwares runs in the order that you create them in.
```js
app.use(callback)
```

### set
"set" can be used to start a process that neads external libraris. The set function can give you access to new fitures and can add commands to the app objekt. 
```js
app.set(proces, extarnallib|callback)
```

## object

### query params
query params is accessebel in eny get route
```js
app.get('/', (request, response) => {
    response.send(`Hi, ${request.query.name}`);
});
url: http://localhost/?name="Philip"
out: "Hi, Philip"
```

### params
params is accessebel in eny post route
```js
app.get('/Book/:book/Author/:author', (request, response) => {
    response.send(`Book: ${request.params.book}, Author: ${request.params.author}`);
});
url: http://localhost/Book/Pippi/Author/GW person
out: "Book: Pippi, Author: GW person"
```