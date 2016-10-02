var validator  = require('validator');
module.exports = function(module){
	module.controller('HomeCtrl', ['$scope', '$route', 'HomeService','$window', function($scope, $route, HomeService, $window){
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
			console.log($scope.checkName);
			$scope.checkSurname = validator.isAlpha($scope.user.surname) && validator.isLength($scope.user.surname, {min:2, max:30});
			$scope.checkEmail = validator.isEmail($scope.user.email);
			$scope.checkUsername = validator.isAlphanumeric($scope.user.username) && validator.isLength($scope.user.username, {min:4, max:20});
			$scope.checkPassword = validator.isAlphanumeric($scope.user.password) && validator.isLength($scope.user.password, {min:6, max:20});
	  };

		$scope.signup = function(){
			validateInputs();

			if($scope.checkName === false){
				$scope.validInputs = false;
			}
			else if($scope.checkSurname === false){
				$scope.validInputs = false;
			}
			else if($scope.checkEmail === false){
				$scope.validInputs = false;
			}
			else if($scope.checkUsername === false){
				$scope.validInputs = false;
			}
			else if($scope.checkPassword === false){
				$scope.validInputs = false;
			}

			if($scope.validInputs){
				HomeService.createUser($scope.user)
				.then(function(res){
					console.log('Successful signup', res);
					$window.location.href = '#/chat';
					console.log(res);
					console.log(res._id);
				},
				function(error){
					console.log(error);
				});
			}
			else{
				alert('Invalid credentials');
			}
		};
	}]);
};
