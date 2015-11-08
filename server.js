var http = require("http");
var util = require('util');
var Firebase = require("firebase");
var qs = require('querystring');
var dbref = new Firebase('https://scorching-inferno-7288.firebaseio.com/');
var fs = require('fs');

console.log("server started");

http.createServer(function (request, response) {
    if (request.method == 'POST') {
        console.log("POST reached");
        var body = '';

        request.on('data', function (data) {
            body += data.toString();
        });

        request.on('end', function () {
            //var post = qs.parse(body);
            
            //request ended -> do something with the data
            //response.writeHead(200, "OK", {'Content-Type': 'text/html'});
            
            //parse the received body data
            var decodedBody = qs.parse(body);
            
            //output the decoded data to the HTTP response
            console.log(util.inspect(decodedBody));
            //response.end();
            
            //var post = qs.parse(body);
            //console.log(`post.trigger`);
            //dbref.set(`post.trigger`);
        });
    }
    if (request.method == 'GET') {
        fs.readFile('./post.html', function (err, html) {
            if (err) {
                throw err;
            } 
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();
        console.log("GET response happened");
        });
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
