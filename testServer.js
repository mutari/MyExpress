const ServerLite = require('./src/ServerLite');
const app = new ServerLite();

app.get('/', (request, response) => {
    response.send('Hello wrold!');
});

app.get('/Book/:book/Author/:author', (request, response) => {
    response.send(`Book: ${request.params.book}, Author: ${request.params.author}`);
});

app.listen(3000);