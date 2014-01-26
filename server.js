'use strict';

var http = require('http'),
    util = require('util'),
    server = require('node-static'),
    fileServer = new server.Server('./public');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) {
                util.error("Error serving " + request.url + " - " + err.message);

                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(8081);
