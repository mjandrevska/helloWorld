var _ = require('lodash');

//Model
var Friendships = require('../models/Friendship');

//Route
var friendshipRouter = require('../routes/friendship');

module.exports = {
	getFriendship: function(req, res, next){
		return Friendships.find(function(err, friends){
			if(err){
				return console.log(err);
			}
			else{
				return res.send(friends);
			}
		});
	},

	createFriendship: function(req, res, next){
		var friend;
		console.log('POST');
		console.log(req.body);
		friend = new Friendships({
			fromUser: req.user._id,
			toUser: req.body.toUser,
			approved: false
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
	},

	deleteFriendship: function(req, res, next){
		return Friendships.remove(req.body, function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log('Deleting the friendship');
				return res.send();
			}
		});	
	}
};