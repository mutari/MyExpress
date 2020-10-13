"use strict";
function staticFiles(req, res, next) {
    let fileName = req.url.split('/').pop();
    console.log(fileName);
}
module.exports = {
    static: staticFiles
};
//# sourceMappingURL=Middleware.js.map