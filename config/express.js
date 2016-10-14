var express = require('express');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var passport = require('passport');
var http = require('./http');
var store = require('./sessionStore');

var app = express();
http.on('request', app);
app.use(express.static('public'));

app.use(cookieSession({
  	name: 'session',
	secret: 'keyboard cat',
}));

app.use(passport.initialize());
app.use(passport.session());

//Routes
var userRouter = require('../app/routes/user');
var messageRouter = require('../app/routes/message');
var friendshipRouter = require('../app/routes/friendship');


//Using routes
app.use('/users',userRouter);
app.use('/messages', messageRouter);
app.use('/friends', friendshipRouter);


module.exports = app;