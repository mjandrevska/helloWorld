var assert = require('assert');
var init = require('../../../config/init');
var mongoose = require('mongoose');
var async = require('async');

mongoose.connect('mongodb://localhost:27017/hello_world_test');
var database_test = mongoose.connection;

//Model
var Users = require('../../models/user');
var Messages = require('../../models/message');

//Route
var userRouter = require('../../routes/message');
var user1 = null;
var user2 = null;

beforeEach(function(done){
	async.parallel([
		function(cb) {
			Users.remove({}, function(err){
				cb(err);
			});
		},
		function(cb) {
			Messages.remove({}, function(err){
				cb(err);
			});
		}
	], function() {

		user1 = new Users({
			name: 'FirstName',
			surname: 'LastName',
			email: 'test1@test1.com',
			username: 'username1',
			password: 'password'
		});

		user2 = new Users({
			name: 'FirstName',
			surname: 'LastName',
			email: 'test2@test2.com',
			username: 'username2',
			password: 'password'
		});

		async.parallel([
			function(cb) {
				user1.save(function(err){
					cb(err);
				});
			},
			function(cb) {
				user2.save(function(err){
					cb(err);
				});
			}
		],
		function(err) {
			done(err);
		});
	});
});

describe('Creating a new message', function(){
	describe('#save()', function(){
		it('should be able to create a new message from one user to another', function(done){
			var message = new Messages({
				message: 'This is a simple test',
				fromUser: user1,
				toUser: user2
			});
			message.save(function(err) {
				done(err);
			});
		});

		it('should not be able to create a new message without a message', function(done){
			var message = new Messages({
				fromUser: user1,
				toUser: user2
			});
			message.save(function(err) {
				if(err){
					done();
				}
				else{
					done('The unit test did not throw an error');
				}
			});
		});

		it('should not be able to create a new message with an incorrect message length', function(done){
			var message = new Messages({
				message: 'a',
				fromUser: user1,
				toUser: user2
			});
			message.save(function(err) {
				if(err){
					done();
				}
				else{
					done('The unit test did not throw an error');
				}
			});
		});

		it('should not be able to create a new message without a sender', function(done){
			var message = new Messages({
				message: 'This is a simple test',
				toUser: user2
			});
			message.save(function(err) {
				if(err){
					done();
				}
				else{
					done('The unit test did not throw an error');
				}
			});
		});

		it('should not be able to create a new message without a receiver', function(done){
			var message = new Messages({
				message: 'This is a simple test',
				fromUser: user1
			});
			message.save(function(err) {
				if(err){
					done();
				}
				else{
					done('The unit test did not throw an error');
				}
			});
		});
	});
});