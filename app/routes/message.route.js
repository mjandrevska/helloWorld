var express = require('express');
var bodyParser = require('body-parser');
var messageRouter = express.Router();

var messageController = require('../controllers/message');
messageRouter.use(bodyParser.json());

//GET Messages: List all the messages
messageRouter.get('/', messageController.listMessage);

//POST Messages: Create a new message
messageRouter.post('/', messageController.createMessage);

//DELETE Messages: Delete all the messages
messageRouter.delete('/', messageController.deleteAllMessages);

//GET Message/:id: List a message with specific id
messageRouter.get('/:id', messageController.listSpecificMessage);

//PUT Message/:id - Update a message with specific id
messageRouter.put('/:id', messageController.updateSpecificMessage);

//DELETE Message/:id
messageRouter.delete('/:id', messageController.deleteSpecificMessage);

module.exports = messageRouter;