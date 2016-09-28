var http = require('http');
var primus = require('primus');

var app = require('./express.js');

var server = http.createServer(app);
primus(server);
server.listen(3000);

