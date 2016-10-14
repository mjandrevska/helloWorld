var Primus = require('primus');
var cookieSession = require('cookie-session');
var passport = require('passport');
var server = require('./http');
var store = require('./sessionStore');

var users = {};

var primus = new Primus(server,{
	transformer: 'websockets',
	parser: 'JSON'
});


primus.use(cookieSession({
  	name: 'session',
	secret: 'keyboard cat',
}));


primus.use(passport.initialize());
primus.use(passport.session());

primus.on('connection', function(spark) {
	if(spark.request.user){
		if(users[spark.request.user._id]){
			users[spark.request.user._id].push(spark);
		}
		else{
			users[spark.request.user._id] = [spark];
		}
 	}
});

primus.on('data', function(data){
	primus.write(data);
});


primus.on('disconnection', function(spark){
	if(spark.request.user){
		users[spark.request.user._id].splice(users[spark.request.user._id].indexOf(),1);	
 	}
});

module.exports.users = users;

