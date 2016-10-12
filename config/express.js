var express = require('express');
var session = require('express-session'); 
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();
app.use(express.static('public'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: new Date(253402300000000) }
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