export = {
    static: staticFiles
}

function staticFiles(req, res, next) {
    let fileName = req.url.split('/').pop();

    console.log(fileName);
}