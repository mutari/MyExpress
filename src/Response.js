"use strict";
var fs = require('fs');
class response {
    static sendFile(path) {
        var stat = fs.statSync(path);
        response.response.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': stat.size
        });
        var readStream = fs.createReadStream(path);
        readStream.pipe(response.response);
    }
    static json(json_data) {
        response.response.writeHead(200, {
            'Content-type': 'text/json'
        });
        response.response.write(json_data);
    }
    static send(data) {
        response.response.write(data);
    }
}
module.exports = response;
//# sourceMappingURL=Response.js.map