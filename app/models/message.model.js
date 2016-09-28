var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

//Schema Validation
var messageValidator = [
	validate({
		validator: 'isLength',
		arguments: [2, 600],
		message: 'The message length is incorrect'
	})
];

//message Schema

var MessageSchema = new Schema({

	message:{
		type: String,
		required: true,
		validate: messageValidator
	},
	
	fromUser:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	toUser:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
},
{
	timestamps: true
}

);

var Messages = mongoose.model('Message', MessageSchema);
module.exports = Messages;