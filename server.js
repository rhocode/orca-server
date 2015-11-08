var http = require("http");
var Firebase = require("firebase");
var qs = require('querystring');
var dbref = new Firebase('https://scorching-inferno-7288.firebaseio.com/');

console.log("server started");

http.createServer(function (request, response) {
    if (request.method == 'POST') {
        console.log("POST reached");
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
            console.log(request);
            dbref.set(post);
        });
    }
    if (request.method == 'GET') {
        var body = 'the thing works';
        response.writeHead(200, {'Content-Type': 'text/html','Content-Length':body.length});
        response.write(body);
        response.end();
        console.log("GET response happened");
    }
}
).listen(process.env.PORT || 3000);

/*
const port=8080;
function handleRequest(request, response) {
    response.end("It works! Path Hit: " + request.url);
    console.log("It works! Path Hit: " + request.url);
}

//create the server
var server = http.createServer(handleRequest);

//start the server
server.listen(port, function(){
    //callback triggered when server is successfully listening
    console.log("Server listening on http://localhost:%s", port);
});
*/