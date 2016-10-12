module.exports = function(module){
	module.controller('ChatCtrl', ['$scope', '$routeParams','$route', 'UserService', 'ChatService', 'FriendsService',function($scope, $routeParams,$route, UserService, ChatService,FriendsService){
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

		$scope.sendMessage = function(){
			console.log('Sending msg');
			var data = {
				message: $scope.msg,
				fromUser: UserService.userData.id,
				toUser: $routeParams.id
			};
			console.log('Data', data);
			ChatService.createMessage(data)
			.then(function(result){
				console.log('Successful sending message');
				document.getElementById("commentTxtArea").value = '';
			}, function(error){
				console.log(error);
				alert('Error');
			});
		};

		$scope.getMyFriends = function(){
			FriendsService.getMyFriends()
			.then(function(result){
				console.log('Successful getting the list of my friends');
				$scope.myFriends = result;
			}, function(error){
				console.log('Error while trying to get my friends');
			});
		};

		$scope.getMyFriends();

		$scope.listMyMessages = function(){
			ChatService.listMessages($routeParams.id)
			.then(function(result){
				console.log('Successful listing the messages');
				$scope.messages = result;
				console.log('res messages', $scope.messages);
			}, function(error){
				console.log('Error for listing the messages');
			});
		};

		$scope.listMyMessages();
	}]);
};
