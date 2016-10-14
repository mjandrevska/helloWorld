var _ = require('lodash');
var primus = require('../../config/primus');
//Model
var Messages = require('../models/message');

//Route
var messageRouter = require('../routes/message');

module.exports = {
	listMessage: function(req, res, next){
		var query = {};
		if(req.query.otherUser){
			query = {
				$or:[
					{fromUser: req.user.id, toUser: req.query.otherUser},
					{fromUser: req.query.otherUser, toUser: req.user.id}
				]
			};	
		}
		return Messages.find(query, function(err, messages){
			if(err){
				console.log(err);
			}
			else{
				return res.send(messages);
			}
		});
	},

	createMessage: function(req, res, next){
		var msg;
		msg = new Messages({
			message: req.body.message,
			fromUser: req.user.id,
			toUser: req.body.toUser
		});
		msg.save(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log('primus users', primus.users);
				var i;
				var pmessage = {
					type: 'message',
					data: msg.toObject()
				};
				if(primus.users[req.body.toUser]) {
					for(i=0; i<primus.users[req.body.toUser].length; i++){
						console.log(primus.users[req.body.toUser][i]);
						primus.users[req.body.toUser][i].write(pmessage);
					}
				}
				if(primus.users[req.user.id]) {
					for(i=0; i<primus.users[req.user.id].length; i++){
						primus.users[req.user.id][i].write(pmessage);
					}
				}
				return res.send(msg);
			}
		});
	},

	deleteAllMessages: function(req, res, next){
		Messages.remove(req.body, function(err){
			if(err){
				console.log(err);
			}
			else{
				return res.send();
			}
		});
	},

	listSpecificMessage: function(req, res, next){
		Messages.findById(req.params.id, function(err, message){
			if(err){
				console.log(err);
			}
			else{
				return res.send(message);
			}
		});
	},

	updateSpecificMessage: function(req, res, next){
		Messages.findById(req.params.id, function(err, msg){
			msg = _.defaults(req.body, msg);
			
			return msg.save(function(err){
				if(err){
					console.log(err);
					res.status(401).send(err);
				}
				else{
					return res.send(msg);
				}
			});
		});
	},

	deleteSpecificMessage: function(req, res, next){
		Messages.remove(req.params.id, function(err){
			if(err){
				console.log(err);
			}
			else{
				return res.send();
			}
		});
	}
};