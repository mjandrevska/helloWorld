var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var crypto = require('crypto');
var Schema = mongoose.Schema;


//Schema Validation
var firstNameValidator = [
	validate({
		validator: 'isLength',
		arguments: [2,20],
		message: 'The first name should be between {ARGS[0]} and {ARGS[1]} characters'
	}),
	validate({
		validator: 'isAlpha',
		passIfEmpty: true,
		message: 'The first name should contain alpha characters only'
	})
];

var lastNameValidator = [
	validate({
		validator: 'isLength',
		arguments: [2, 30],
		message: 'The last name should be between {ARGS[0]} and {ARGS[1]} characters'
	}),
	validate({
		validator: 'isAlpha',
		passIfEmpty: true,
		message: 'The last name should contain alpha characters only'
	})
];

var emailValidator = [
	validate({
		validator: 'isEmail',
		passIfEmpty: true,
		message: 'The email should be in the correct format'
	})
];

var usernameValidator = [
	validate({
		validator: 'isLength',
		arguments: [4, 20],
		message: 'The username should be between {ARGS[0]} and {ARGS[1]} characters'
	}),
	validate({
		validator: 'isAlphanumeric',
		passIfEmpty: true,
		message: 'The username should contain alphanumeric characters only'
	})
];

var passwordValidator = [
	validate({
		validator: 'isLength',
		arguments: [6,1000],
		message: 'The password should be longer than {ARGS[0]} and smaller than {ARGS[1]} characters'
	}),
	validate({
		validator: 'isAlphanumeric',
		passIfEmpty: true,
		message: 'The password should contain alphanumeric characters only'
	})
];

//User Schema
var userSchema = new Schema({

	name:{
		type: String,
		required: true,
		validate: firstNameValidator
	},
	surname:{
		type: String,
		required: true,
		validate: lastNameValidator
	},
	email:{
		type: String,
		required: true,
		unique: true,
		validate: emailValidator
	},
	username:{
		type: String,
		required: true,
		unique: true,
		validate: usernameValidator
	},
	password:{
		type: String,
		required: true,
		validate: passwordValidator
	},
	salt: {
		type: String
	},

	image:{
		type: String,
		required: false,
		default: ''
	},
	active:{
		type: Boolean,
		required: false
	}
});

//Crypting the password
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
    	.toString('hex') 
        .slice(0,length);  
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};


userSchema.pre('save', function(next){
	if(this.isModified('password')){
		this.salt = genRandomString(16); 
    	this.password = sha512(this.password, this.salt);	
	}
	next();
});

userSchema.methods.getClean = function(){
	var user = this.toObject();
	delete user.password;
	delete user.salt;
	return user;
};

userSchema.methods.checkValidPassword = function(password){
	return (this.password === sha512(password, this.salt));
};

var Users = mongoose.model('User', userSchema);
module.exports = Users;