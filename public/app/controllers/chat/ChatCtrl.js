var moment = require('moment');

module.exports = function(module){
	module.controller('ChatCtrl', ['$scope', '$routeParams','$route', 'UserService', 'ChatService', 'PrimusService', 'FriendsService',function($scope, $routeParams,$route, UserService, ChatService, PrimusService, FriendsService){
		$scope.msg = '';
		$scope.myFriends = {};
		$scope.messages = [];
		$scope.UserService = UserService;

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

		$scope.getMessageTime = function(date) {
			return moment(date);
		};

		$scope.sendMessage = function(){
			var data = {
				message: $scope.msg,
				fromUser: UserService.userData.id,
				toUser: $routeParams.id
			};
			console.log('Data', data);
			ChatService.createMessage(data)
			.then(function(result){
				document.getElementById("commentTxtArea").value = '';
			}, function(error){
				console.log(error);
				alert('Error');
			});
		};

		$scope.getMyFriends = function(){
			FriendsService.getMyFriends()
			.then(function(result){
				$scope.myFriends = result;
			}, function(error){
				console.log('Error while trying to get my friends');
			});
		};

		$scope.getMyFriends();

		$scope.listMyMessages = function(){
			ChatService.listMessages($routeParams.id)
			.then(function(result){
				$scope.messages = ChatService.messages;
			}, function(error){
				console.log('Error for listing the messages');
			});
		};

		console.log($routeParams.id);
		if($routeParams.id){
			$scope.listMyMessages();
		}

	}]);
};
