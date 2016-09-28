var assert = require('assert');
var init = require('../../../config/init');
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hello_world_test');
var database_test = mongoose.connection;

//Models
var Users = require('../../models/user');
var Friendships = require('../../models/friendship');

var user1 = null;
var user2 = null;

beforeEach(function(done){
	async.parallel([
		function(cb){
			Users.remove({}, function(err){
				cb(err);
			});
		},
		function(cb){
			Friendships.remove({}, function(err){
				cb(err);
			});
		}
	],  function(){

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

			function(cb){
				user1.save(function(err){
					cb(err);
				});
			},
			function(cb){
				user2.save(function(err){
					cb(err);
				});
			}
		], function(err){
			done(err);
		});
	});
});

describe('should be able to create a new friendship', function(){
	describe('#save()', function(){
		//Unit test for creating a friendship without a sender
		it('should not be able to create a friendship without a sender', function(done){
			var friendship = new Friendships({
				toUser: user2,
				approved: true
			});

			friendship.save(function(err){
				if(err){
					done();
				}
				else{
					done('The unit test did not throw an error');
				}
			});
		});

		//Unit test for creating a friendship without a receiver
		it('should not be able to create a friendship without a receiver', function(done){
			var friendship = new Friendships({
				fromUser: user1,
				approved: true
			});

			friendship.save(function(err){
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