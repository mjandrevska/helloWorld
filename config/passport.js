var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//Models
var Users = require('../app/models/user');


//Setting Passport
passport.use(new LocalStrategy( function(username, password, done) {
	Users.findOne({ username: username, password: password }, function(err, user) {
    	if (err){ 
    		return done(err); 
    	}

      	if (!user) {
        	return done(null, false, { message: 'Incorrect username or password' });
      	}
      	
      	return done(null, user);
    });
}));


//Serialize User
passport.serializeUser(function(user, done) {
  console.log('Serizalize',user.id);
  done(null, user.id);
});


//Deserialize User
passport.deserializeUser(function(id, done) {
	console.log("Deserializing");
  	Users.findById(id, function(err, user) {
    	done(err, user);
  	});
});
