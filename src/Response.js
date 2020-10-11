module.exports = {
    sendFile: sendFile,
    send: send
}

function send(data) {
    
}

function sendFile(path) {
    path = __dirname + "/../" + path;
    console.log('path', path)
}