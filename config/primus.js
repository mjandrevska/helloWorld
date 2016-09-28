var Primus = require('primus');


var primus = new Primus(server,{
	transformer: 'websockets',
	parser: 'JSON'
});

var client = new Socket('http://localhost:8080');

primus.on('connection', function(spark){
	spark.on('data', function(data){
			console.log('Received data from client', data);
	});
});

primis.on('open', function(spark){
	console.log('The connection is alive');
});

primus.on('end', function(spark){
	console.log('The connection came to an end');
});

primus.end();
