var passport = require('passport');

//Model
var Users = require('../models/user');

//Route
var userRouter = require('../routes/user');

module.exports = {
	create: function(req, res, next){
		var user;
		console.log('POST');
		console.log(req.body);
		user = new Users({
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			active: req.body.active
		});
		user.save(function(err){
			if(err) {
				console.log('Error while creating a new user');
				res.status(400).send(err);
			}
			else{
				console.log('A new user is created using the Sign Up form');
				return res.send(user);
			} 
		});
	},

	read: function(req, res, next){
		Users.find(function(err, users){
			console.log('GET USERS');
			if(err){
				return console.log(err);
			}
			else{
				return res.send(users);
			}
		});
	},

	delete: function(req, res, next){
		Users.remove(req.body, function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log('I am deleting all the users');
				return res.send();
			}
		});
	},

	readId: function(req, res, next){
		Users.findById(req.params.id, function(err, user){
			if(err){
				return console.log(err);
			}
			else{
				console.log('I am listing a user with specific id');
				return res.send(user);
			}
		});
	},

	update: function(req, res, next){
		Users.findById(req.params.id, function(err, user){
			user.name = req.body.name;
			user.surname = req.body.surname;
			user.email = req.body.email;
			user.username = req.body.username;
			user.password = req.body.password;
			user.image = req.body.image;
			user.active = req.body.active;

			user.save(function(err){
				if(err){
					console.log(err);
					res.status(401).send(err);
				}
				else{
					console.log('Updated User');
					return res.send(user);
				}
			});
		});
	},

	deleteId:  function(req, res, next){
		Users.findById(req.params.id, function(err, user){
			user.remove(function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log('I am deleting this user');
					return res.send('');
				}
			});
		});
	},

	login: function(req, res, next){
		passport.authenticate('local', function(err, user, info){
			if(err){
				console.log(err);
			}
			else{
				console.log('Successful');
				console.log('Hello user', user);
				if(user === false){
					res.status(401).send('Credentials incorrect');
					return;
				}
				req.logIn(user, function(err) {
					if (err) { return next(err); }
					return res.status(200).send('Login successful');
				});
			}
		})(req, res, next);
	},

	logout:  function(req, res, next){
		//var name = req.user.username;
		console.log('log out');
		req.logout();
		res.status(200).send('User logout successful');
	}
};