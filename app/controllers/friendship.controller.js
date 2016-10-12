var _ = require('lodash');

//Model
var Friendships = require('../models/friendship');

module.exports = {
	getFriendships: function(req, res, next){
		var query = {};

		switch(req.query.type){
			case 'friend_requests':
				query = {
					toUser: req.user._id,
					approved: false
				};
				break;
			case 'friends':
				query = {
					$or: [
						{fromUser: req.user._id},
						{toUser: req.user._id}
					],
					approved:true
				};
				break;
		}

		Friendships
		.find(query) 
		.populate('fromUser toUser', 'name surname')
		.exec(function(err, friends){
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
		console.log(req.body);
		var query = {};
		/*query = {
			$or: [
				{fromUser: req.user._id},
				{toUser: req.body.toUser}
			],
			approved: true
		};
		console.log('Query:',query);
		friend.find(query);*/
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

	acceptRequest: function(req, res, next){
		console.log('PUT method');

		Friendships.findById(req.params.id, function(err, friend){
			if(err){
				console.log(err);
				return res.status(401).send(err);
			}
			else if(!friend){
				console.log('friendship does not exists');
				return res.status(401).send();
			}
			else{
				friend.approved = true;
				console.log('Becoming friends...');
				friend.save(function(err){
				if(err){
					console.log(err);
					return res.status(401).send(err);
				}
				else{
					console.log('Friends!!!');
					return res.send(friend);
				}
			});
			}
		});
	},

	deleteFriendship: function(req, res, next){
		var friend;
		console.log('Delete friendship');
		Friendships.remove({id: req.params.id}, function(err){
			if(err){
				console.log('Error while deleting a friendship');
				return res.status();
			}
			else{
				console.log('Success while deleting a friendship');
				return res.send();
			}
		});
	}
};