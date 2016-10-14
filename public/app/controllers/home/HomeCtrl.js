var validator  = require('validator');
module.exports = function(module){
	module.controller('HomeCtrl', ['$scope', '$route', 'UserService','$window', '$uibModal', function($scope, $route, UserService, $window,$uibModal){
		console.log('This is the main controller');
		$scope.user = {name: '', surname: '', username: '', email: '', password: ''};
		var homeScope = $scope;

		var loggedIn = window.localStorage.getItem('userData');

		if(loggedIn){
			UserService.userData = JSON.parse(loggedIn);
			$window.location.href = '#/chat/';
			return;
		}

		$scope.openModal = function() {
			$uibModal.open({
				ariaLabelledBy: 'modal-title-top',
				ariaDescribedBy: 'modal-body-top',
				templateUrl: 'myLoginModalContent.html',
				controller: 'LoginModal',
				controllerAs: '$ctrl',
			});
		};

		$scope.openSignUpModal = function(){
			$uibModal.open({
				ariaLabelledBy: 'modal-title-top',
				ariaDescribedBy: 'modal-body-top',
				templateUrl: 'mySignUpModalContent.html',
				controller: 'SignUpModal',
				controllerAs: '$signupCtrl',
			});	
		};

		
	}]);

	module.controller('LoginModal', ['$uibModalInstance', 'UserService','$window', '$uibModal', function($uibModalInstance, UserService, $window, $uibModal){
		var $ctrl = this;
		$ctrl.validUsername = true;
		$ctrl.validPassword = true;
		$ctrl.validInputs = true;

		$ctrl.user = {name: '', surname: '', username: '', email: '', password: ''};


		var validateLogin = function(){
			$ctrl.checkingUsername = validator.isAlphanumeric($ctrl.user.username) && validator.isLength($ctrl.user.username, {min:4, max:20});
			$ctrl.checkingPassword = validator.isAlphanumeric($ctrl.user.password) && validator.isLength($ctrl.user.password, {min:6, max:20});
		};

		$ctrl.login = function(){
			validateLogin();

			if($ctrl.checkingUsername === false){
				$ctrl.validUsername = false;
				$ctrl.validInputs = false;
			}
			else if($ctrl.checkingPassword === false){
				$ctrl.validPassword = false;
				$ctrl.validInputs = false;
			}

			if($ctrl.validInputs){
				UserService.login($ctrl.user)
				.then(function(res){
					console.log('Successful login', res);
					$uibModalInstance.close($ctrl);
					$window.location.href = '#/chat/';
				}, function(error){
					alert('Please enter the correct credentials');
					console.log('Error while trying to login');
				});
			}
		};
	}]);

	module.controller('SignUpModal', ['$uibModalInstance', 'UserService','$window', '$uibModal', function($uibModalInstance, UserService, $window, $uibModal){
		var $signupCtrl = this;
		$signupCtrl.validName = true;
		$signupCtrl.validSurname = true;
		$signupCtrl.validEmail = true;
		$signupCtrl.validUsername = true;
		$signupCtrl.validPassword = true;
		$signupCtrl.validInputs = true;

		$signupCtrl.user = {name: '', surname: '', username: '', email: '', password: ''};

		var validateInputs = function(){
			$signupCtrl.checkName = validator.isAlpha($signupCtrl.user.name) && validator.isLength($signupCtrl.user.name, {min:2, max:20});
			$signupCtrl.checkSurname = validator.isAlpha($signupCtrl.user.surname) && validator.isLength($signupCtrl.user.surname, {min:2, max:30});
			$signupCtrl.checkEmail = validator.isEmail($signupCtrl.user.email);
			$signupCtrl.checkUsername = validator.isAlphanumeric($signupCtrl.user.username) && validator.isLength($signupCtrl.user.username, {min:4, max:20});
			$signupCtrl.checkPassword = validator.isAlphanumeric($signupCtrl.user.password) && validator.isLength($signupCtrl.user.password, {min:6, max:20});
	  	};

	  	$signupCtrl.signup = function(){
			validateInputs();

			if($signupCtrl.checkName === false){
				$signupCtrl.validName = false;
				$signupCtrl.validInputs = false;
			}
			else if($signupCtrl.checkSurname === false){
				$signupCtrl.validSurname = false;
				$signupCtrl.validInputs = false;
			}
			else if($signupCtrl.checkEmail === false){
				$signupCtrl.validEmail = false;
				$signupCtrl.validInputs = false;
			}
			else if($signupCtrl.checkUsername === false){
				$signupCtrl.validUsername = false;
				$signupCtrl.validInputs = false;
			}
			else if($signupCtrl.checkPassword === false){
				$signupCtrl.validPassword = false;
				$signupCtrl.validInputs = false;
			}

			if($signupCtrl.validInputs){
				UserService.createUser($signupCtrl.user)
				.then(function(res){
					console.log('Successful signup', res);
					$uibModalInstance.close($signupCtrl);
					$window.location.href = '#/chat/';
				},
				function(error){
					alert('Please enter the correct credentials');
					console.log(error);
				});
			}
		};


	}]);

};
