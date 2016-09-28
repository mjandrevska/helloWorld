var assert = require('assert');
var init = require('../../../config/init');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hello_world_test');
var database_test = mongoose.connection;

//Model
var Users = require('../../models/user');

//Route
var userRouter = require('../../routes/user');

beforeEach(function(done){
	Users.remove({}, function(err){
		done();
	});
});

describe('Creating a new user', function(){
	describe('#save()', function(){
		it('should be able to create a new user', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'Last Name',
				email: 'test1@test1.com',
				username: 'username1',
				password: 'password'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});

		it('should not be able to create a new user without name', function(done){
			var user = new Users({
				surname: 'LastName',
				username: 'username2',
				email: 'test2@test2.com',
				password: 'password'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});

		it('should not be able to create a new user without surname', function(done){
			var user = new Users({
				name: 'FirstName',
				username: 'username3',
				email: 'test3@test3.com',
				password: 'password'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw an error');
				}
			});
		});

		it('should not be able to create a new user without username', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'Last Name',
				email: 'test4@test4.com',
				password: 'password'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});


		it('should not be able to create a new user without email', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'LastName',
				username: 'username',
				password: 'password'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});

		it('should not be able to create a new user without password', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'LastName',
				email: 'test@test.com',
				username: 'username'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect first name length', function(done){
			var user = new Users({
				name: 'a',
				surname: 'LastName',
				username: 'username',
				password: 'password',
				email: 'test@test.com'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect first name', function(done){
			var user = new Users({
				name: '123456#@!',
				surname: 'LastName',
				username: 'username',
				password: 'password',
				email: 'test@test.com'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect last name length', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'a',
				username: 'username',
				password: 'password',
				email: 'test@test.com'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect last name', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: '123456#@!',
				username: 'username',
				password: 'password',
				email: 'test@test.com'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Unit test did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect email', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'LastName',
				username: 'username',
				password: 'password',
				email: 'test123'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Model did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect username length', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'LastName',
				username: 'abc',
				password: 'password',
				email: 'test4@test4.com'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Unit test did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect username', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'LastName',
				username: '!@#$%^&*',
				password: 'password',
				email: 'test4@test4.com'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Unit test did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect password length', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'LastName',
				username: 'username',
				password: 'abcde',
				email: 'test4@test4.com'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Unit test did not throw error');
				}
			});
		});

		it('should not be able to create a new user with incorrect password', function(done){
			var user = new Users({
				name: 'FirstName',
				surname: 'LastName',
				username: 'username',
				password: '!@#$%^&',
				email: 'test4@test4.com'
			});
			user.save(function(err){
				if(err){
					done();
				}
				else{
					done('Unit test did not throw error');
				}
			});
		});
	});
});