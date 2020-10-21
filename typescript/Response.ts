declare function require(name:string);
var fs = require('fs');

class response {

    private static response;

    public static sendFile(path: string) {
        var stat = fs.statSync(path);

        response.response.writeHead(200, {
            'Content-Type': response.getContentType(path.split('.').pop()), // add suport for multipal file types
            'Content-Length': stat.size
        })

        var readStream = fs.createReadStream(path);

        readStream.pipe(response.response)
    }

    public static json(json_data) {

        response.response.writeHead(200, {
            'Content-type': 'text/json'
        });

        response.response.write(json_data);

    }

    public static send(data) {
        response.response.write(data);
        response.response.end();
    }

    private static getContentType(type) {
        for(let i = 0; i < response.ContentTypes.length; i++)
            if(response.ContentTypes[i].type == type)
                return response.ContentTypes[i].content;
        return 'text/plain';
    }

    private static ContentTypes = [
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
    ]
}

export = response;