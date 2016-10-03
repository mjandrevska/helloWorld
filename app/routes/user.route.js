var express = require('express');
var bodyParser = require('body-parser');

var userRouter = express.Router();


var userController = require('../controllers/user');
userRouter.use(bodyParser.json());

/*userRouter.get('/me', function(req, res, next){
	console.log(req.user);
	return res.send('OK');
});*/

//Login
userRouter.post('/login', userController.login);

//LOGOUT 
userRouter.get('/logout', userController.logout);

//GET /Users listing
userRouter.get('/', userController.read);

//POST /Users - SIGN UP
userRouter.post('/', userController.create);

//DELETE /Users
userRouter.delete('/', userController.delete);

//GET /Users:id
userRouter.get('/:id', userController.readId);

//PUT /Users:id
userRouter.put('/:id', userController.update);

//DELETE /Users:id
userRouter.delete('/:id', userController.deleteId);



module.exports = userRouter;