var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var friendshipRouter = express.Router();

var Friendships = require('../models/friendship');
friendshipRouter.use(bodyParser.json());

//GET /Friendship listing
friendshipRouter.get('/', function(req, res, next){
	return Friendships.find(function(err, friends){
		if(err){
			return console.log(err);
		}
		else{
			return res.send(friends);
		}
	});
});

//POST /Friendship
friendshipRouter.post('/', function(req, res, next){
	var friend;
	console.log('POST');
	console.log(req.body);
	friend = new Friendships({
		fromUser: req.body.fromUser,
		toUser: req.body.toUser,
		approved: req.body.approved
	});
	friend.save(function(err){
		if(err) {
			console.log('Error while creating a new friendship');
			res.status(400).send(err);
		}
		else{
			console.log('A new friendship is created');
			return res.send(friend);
		} 
	});
});

//DELETE /Friendship
friendshipRouter.delete('/', function(req, res, next){
	return Friendships.remove(req.body, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('Deleting the friendship');
			return res.send();
		}
	});
});


module.exports = friendshipRouter;