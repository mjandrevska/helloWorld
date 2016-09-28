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

//Controller
var userController = require('../../controllers/user');
var user1 = null;

beforeEach(function(done){
	async.parallel([
		function(cb) {
			Users.remove({}, function(err){
				cb(err);
			});
		},
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
			}, function(cb){
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

describe('Unit tests for all the Restful API operations', function(){
	describe('#read()', function(){
		it('should be able to list the users', function(done){
			request
			.get('/users')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					res.body[0]._id.should.equal(user1.id);
					res.body[0].name.should.equal(user1.name);
					res.body[0].surname.should.equal(user1.surname);
					res.body[0].email.should.equal(user1.email);
					res.body[0].username.should.equal(user1.username);
					res.body[0].password.should.equal(user1.password);
					done();
				}
			});
		});
	});

	describe('#delete()', function(){
		it('should be able to delete the users', function(done){
			request
			.delete('/users')
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					console.log('Deleted all the users');
					done();
				}
			});
		});
	});

	describe('#readId()', function(){
		it('should be able to list a user with specific id', function(done){
			request
			.get('/users/'+user1.id)
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					console.log('List a user with the given id' +user1.id);
					res.body[0]._id.should.equal(user1.id);
					res.body[0].name.should.equal(user1.name);
					res.body[0].surname.should.equal(user1.surname);
					res.body[0].email.should.equal(user1.email);
					res.body[0].username.should.equal(user1.username);
					res.body[0].password.should.equal(user1.password);
					done();
				}
			});
		});
	});

	describe('#deleteId()', function(){
		it('should be able to delete a user with specific id', function(done){
			request
			.delete('/users/'+user1.id)
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					console.log('Delete a user with the given id' +user1.id);
					done();
				}
			});
		});
	});

	describe('#update()', function(){
		it('should be able to update a user with specific id', function(done){
			request
			.put('/users/'+user1.id)
			.send({'name' : 'Monika'})
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					console.log('Update a user with the given id' +user1.id);
					res.should.have.status(200);
					//res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('UPDATED');
					res.body.UPDATED.should.be.a('object');
					res.body.UPDATED.should.have.property('name');
					res.body.UPDATED.should.have.property('_id');
					res.body.UPDATED.should.have.property('surname');
					res.body.UPDATED.should.have.property('email');
					res.body.UPDATED.should.have.property('username');
					res.body.UPDATED.should.have.property('password');
					res.body.UPDATED.name.should.equal('Monika');
					done();
				}
			});
		});
	});

	describe('#login()', function(){
		it('should be able to login', function(done){
			request
			.login('/login')
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					console.log('The unit test for the login function');
					done();
				}
			});
		});
	});

	describe('#logout()', function(){
		it('should be able to logout a user', function(done){
			request
			.logout('/logout')
			.expect(200)
			.end(function(err, res){
				if(err){
					done(err);
				}
				else{
					console.log('The unit test for the logout function');
					res.body.should.have.status(200);
					done();
				}
			});
		});
	});
});

