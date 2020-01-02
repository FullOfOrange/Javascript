var http = require('http');

var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html'});
	response.end('Hello node.js');
});

server.listen(80, function(){
	console.log('server run');
});
