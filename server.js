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
        var body = '';
        console.log("GET reached");
    }
}
).listen(3000);