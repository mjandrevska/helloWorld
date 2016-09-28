var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//friendship Schema

var FriendshipSchema = new Schema({

	fromUser:{
		type: String,
		ref: 'User',
		required: true
	},

	toUser:{
		type: String,
		ref: 'User',
		required: true
	},

	approved:{
		type: Boolean,
		required: true,
		default: false
	}
});

FriendshipSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });
var Friendships = mongoose.model('Friendship', FriendshipSchema);
module.exports = Friendships;
