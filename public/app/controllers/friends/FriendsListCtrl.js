module.exports = function(module){
	module.controller('FriendsListCtrl', ['$scope','UserService', 'FriendsService', function($scope,UserService, FriendsService){
		$scope.users = {};
		$scope.myFriends = {};

		$scope.getUsers = function(){
			UserService.getUsers()
			.then(function(result){
				$scope.users = result;
			}, function(error){
				console.log('Error for getting the users');
			});
		};

		$scope.getUsers();

		$scope.addFriend = function(friendId){
			FriendsService.createFriendship(friendId)
			.then(function(result){
				console.log('Successfully added a new friend');

			}, function(error){
				console.log('Error for adding friend');
			});
		};

		$scope.removeFriend = function(friendId){
			console.log('This is the removeFriend function');
			FriendsService.deleteFriends(friendId);
			console.log('Removed the friend');
		};

	}]);
};