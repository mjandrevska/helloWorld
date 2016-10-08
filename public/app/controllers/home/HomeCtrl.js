var validator  = require('validator');
module.exports = function(module){
	module.controller('HomeCtrl', ['$scope', '$route', 'UserService','$window', function($scope, $route, UserService, $window){
		console.log('This is the main controller');
		$scope.user = {name: '', surname: '', username: '', email: '', password: ''};
		$scope.validName = true;
		$scope.validSurname = true;
		$scope.validEmail = true;
		$scope.validUsername = true;
		$scope.validPassword = true;
		$scope.validInputs = true;

		var validateInputs = function(){
			$scope.checkName = validator.isAlpha($scope.user.name) && validator.isLength($scope.user.name, {min:2, max:20});
			$scope.checkSurname = validator.isAlpha($scope.user.surname) && validator.isLength($scope.user.surname, {min:2, max:30});
			$scope.checkEmail = validator.isEmail($scope.user.email);
			$scope.checkUsername = validator.isAlphanumeric($scope.user.username) && validator.isLength($scope.user.username, {min:4, max:20});
			$scope.checkPassword = validator.isAlphanumeric($scope.user.password) && validator.isLength($scope.user.password, {min:6, max:20});
	  };

		$scope.signup = function(){
			validateInputs();

			if($scope.checkName === false){
				$scope.validName = false;
				$scope.validInputs = false;
			}
			else if($scope.checkSurname === false){
				$scope.validSurname = false;
				$scope.validInputs = false;
			}
			else if($scope.checkEmail === false){
				$scope.validEmail = false;
				$scope.validInputs = false;
			}
			else if($scope.checkUsername === false){
				$scope.validUsername = false;
				$scope.validInputs = false;
			}
			else if($scope.checkPassword === false){
				$scope.validPassword = false;
				$scope.validInputs = false;
			}

			if($scope.validInputs){
				UserService.createUser($scope.user)
				.then(function(res){
					console.log('Successful signup', res);
					$('.modal').modal('hide');
					$window.location.href = '#/chat/';
					console.log(res);
					console.log(res._id);
				},
				function(error){
					console.log(error);
				});
			}
		};

		var validateLogin = function(){
			$scope.checkingUsername = validator.isAlphanumeric($scope.user.username) && validator.isLength($scope.user.username, {min:4, max:20});
			$scope.checkingPassword = validator.isAlphanumeric($scope.user.password) && validator.isLength($scope.user.password, {min:6, max:20});
		};

		var loggedIn = window.localStorage.getItem('userData');

	  if(loggedIn){
	    UserService.userData = JSON.parse(loggedIn);
	    $window.location.href = '#/chat/';
	    return;
	  }

		$scope.login = function(){
			validateLogin();

			if($scope.checkingUsername === false){
				$scope.validUsername = false;
				$scope.validInputs = false;
			}
			else if($scope.checkingPassword === false){
				$scope.validPassword = false;
				$scope.validInputs = false;
			}

			if($scope.validInputs){
				UserService.login($scope.user)
				.then(function(res){
					console.log('Successful login', res);
					$('.modal').each(function(idx){
						$(this).modal('hide');
						console.log($(this));
					});
					$window.location.href = '#/chat/';
				}, function(error){
					alert('Cannot login');
					console.log('Error while trying to login');
				});
			}
		};
	}]);
};
