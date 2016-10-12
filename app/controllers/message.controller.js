var _ = require('lodash');
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
					{fromUser: req.user._id, toUser: req.query.otherUser},
					{fromUser: req.query.otherUser, toUser: req.user._id}
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