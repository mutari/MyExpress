import { resolveTripleslashReference } from "typescript";

var fs = require('fs');

class response {
    
    private static request;
    private static response;

    public static sendFile(path: string) {
        var stat = fs.statSync(path);

        response.response.writeHead(200, {
            'Content-Type': 'text/html', // add suport for multipal file types
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
    }
}

export = response;