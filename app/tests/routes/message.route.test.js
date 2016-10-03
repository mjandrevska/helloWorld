var assert = require('assert');
var async = require('async');
var supertest = require('supertest');
var should = require('should');
var init = require('../../../config/init');
var mongoose = require('mongoose');

var request = supertest('http://localhost:3000');
var _ = require('lodash');

//Model
var Users = require('../../models/user');
var Messages = require('../../models/message');

//Controller
var userController = require('../../controllers/user');
var messageController = require('../../controllers/message');
var user1 = null;
var user2 = null;
var message1 = null;
var message2 = null;

beforeEach(function(done){
	async.parallel([
		function(cb) {
			Users.remove({}, function(err){
				cb(err);
			});
		}, function(cb){
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

		async.waterfall([
			function(cb) {
				user1.save(function(err){
					cb(err);
				});
			},
			function(cb){
				user2.save(function(err){
					cb(err);
				});
			},
			function(cb) {

				message1 = new Messages({
					message: 'This is a simple message',
					fromUser: user1,
					toUser: user2
				});

				message2 = new Messages({
					message: 'This is another simple messages',
					fromUser: user2,
					toUser: user1
				});

				cb();
			},
			function(cb){
				message1.save(function(err){
					cb(err);
				});
			},
			function(cb){
				message2.save(function(err){
					cb(err);
				});
			}
		],
		function(err) {
			done(err);
		});
	});
});

describe('Unit tests for all the RESTful operations', function(){
	describe('#listMessage()', function(){
		it('should be able to list all the messages', function(done){
			request
			.get('/messages')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					res.body[0].message.should.equal(message1.message);
					res.body[0].fromUser.should.equal(user1.id);
					res.body[0].toUser.should.equal(user2.id);
					done();
				}
			});
		});
	});

	describe('#deleteAllMessagese()', function(){
		it('should be able to delete all messages', function(done){
			request
			.delete('/messages')
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					done();
				}
			});
		});
	});

	describe('#listSpecificMessage()', function(){
		it('should be able to get specific message', function(done){
			request
			.delete('/messages/'+message1.id)
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					done();
				}
			});
		});
	});

	describe('#updateSpecificMessage()', function(){
		it('should be able to update a specific message', function(done){
			request
			.put('/messages/'+message1.id)
			.send({'message': 'An updated message'})
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					done();
				}
			});
		});
	});

	describe('#deleteSpecificMessage()', function(){
		it('should be able to delete a specific message', function(done){
			request
			.delete('/messages/'+message1.id)
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					done();
				}
			});
		});
	});
});