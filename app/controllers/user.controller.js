var passport = require('passport');
var crypto = require('crypto');

//Model
var Users = require('../models/user');

//Route
var userRouter = require('../routes/user');

module.exports = {

	create: function(req, res, next){
		var user;
		console.log(req.body);
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
				res.status(400).send(err);
			}
			else{
				user = user.getClean();
				return res.send(user);
			} 
		});
	},

	read: function(req, res, next){
		Users.find(function(err, users){
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
				if(user === false){
					console.log('Info',info);
					res.status(401).send('Credentials incorrect');
					return;
				}
				req.logIn(user, function(err) {
					if (err) { return next(err); }
					user = user.getClean();
					return res.status(200).send(user);
				});
			}
		})(req, res, next);
	},

	logout:  function(req, res, next){
		req.logout();
		res.status(200);
		res.status(200).send('User logout successful');
	}
};