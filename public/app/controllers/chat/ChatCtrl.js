module.exports = function(module){
	module.controller('ChatCtrl', ['$scope', '$route', 'UserService', 'ChatService', 'FriendsService',function($scope, $route, UserService, ChatService,FriendsService){
		$scope.message = '';
		$scope.myFriends = {};

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

		$scope.getMyFriends = function(){
			console.log('this is the method for getting my friends');
			FriendsService.getMyFriends()
			.then(function(result){
				console.log('Successful getting the list of my friends');
				console.log('My Friends', $scope.myFriends);
				console.log('res', result);
				$scope.myFriends = result;
			}, function(error){
				console.log('Error while trying to get my friends');
			});
		};

		$scope.getMyFriends();
	}]);
};
