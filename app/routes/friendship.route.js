var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var friendshipRouter = express.Router();

var Friendships = require('../models/friendship');
var friendshipController = require('../controllers/friendship');
friendshipRouter.use(bodyParser.json());

//List the friendships
friendshipRouter.get('/', friendshipController.getFriendships);

//Create new friendship
friendshipRouter.post('/', friendshipController.createFriendship);

//Update a friendship
friendshipRouter.put('/:id', friendshipController.acceptRequest);

//Delete a friendship
friendshipRouter.delete('/:id', friendshipController.deleteFriendship);


module.exports = friendshipRouter;