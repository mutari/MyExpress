"use strict";
var fs = require('fs');
class response {
    static sendFile(path) {
        var stat = fs.statSync(path);
        response.response.writeHead(200, {
            'Content-Type': response.getContentType(path.split('.').pop()),
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
        response.response.end();
    }
    static getContentType(type) {
        for (let i = 0; i < response.ContentTypes.length; i++)
            if (response.ContentTypes[i].type == type)
                return response.ContentTypes[i].content;
        return 'text/plain';
    }
}
response.ContentTypes = [
    {
        type: 'html',
        content: 'text/html'
    },
    {
        type: 'pdf',
        content: 'applicaation/pdf'
    },
    {
        type: 'jpeg',
        content: 'image/jpeg'
    },
    {
        type: 'png',
        content: 'image/png'
    },
    {
        type: 'mp4',
        content: 'video/mp4'
    }
];
module.exports = response;
//# sourceMappingURL=Response.js.map