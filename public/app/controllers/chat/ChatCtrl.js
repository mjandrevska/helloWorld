module.exports = function(module){
	module.controller('ChatCtrl', ['$scope', '$route', 'UserService', 'ChatService',function($scope, $route, UserService, ChatService){
		$scope.message = '';
		$scope.users = {};

		$scope.logout = function(){
			UserService.logout()
			.then(function(res){
				window.localStorage.clear();
				console.log('Successful');
				window.location.href = 'http://localhost:3000/#/';
			}, function(error){
				console.log('Error for log out');
			});
		};

		$scope.sendMessage = function(){
			console.log('Sending msg');
			var data = {
				message: $scope.message,
				fromUser: UserService.userData.id,
				toUser: $scope.user.id
			};
			console.log('Data', data);
			ChatService.createMessage($scope.message)
			.then(function(result){
				console.log('Successful sending message');
			}, function(error){
				console.log(error);
				alert('Error');
			});
		};

		console.log('Scope.users', $scope.users);

		$scope.getUsers = function(){
			UserService.getUsers()
			.then(function(result){
				$scope.users = result;
			}, function(error){
				console.log('Error for getting the users');
			});
		};

		$scope.getUsers();

	}]);
};
