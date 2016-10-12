module.exports = function(module){
	module.controller('FriendsListCtrl', ['$scope','UserService', 'FriendsService', function($scope,UserService, FriendsService){
		$scope.users = {};
		$scope.friendRequests = {};

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
			FriendsService.createFriendships(friendId)
			.then(function(result){
				console.log('Successfully added a new friend');

			}, function(error){
				console.log('Error for adding friend');
			});
		};

		$scope.getFriendRequests = function(){
			FriendsService.getFriendRequests()
			.then(function(result){
				console.log('Successfully getting the friend requests!!!');
				$scope.friendRequests = result;
			}, function(error){
				console.log('error for getting the friend requests from the service');
			});
		};
		
		$scope.getFriendRequests();

		$scope.removeFriend = function(friendId){
			console.log('This is the removeFriend function');
			FriendsService.deleteFriends(friendId);
			console.log('Removed the friend');
		};

		$scope.acceptFriendRequest = function(friendId){
			console.log('This is method for accepting the friend requests');
			FriendsService.acceptRequest(friendId)
			.then(function(result){
				console.log('Successfully accepted a friend request');
				var index = $scope.friendRequests.indexOf(friendId);
				$scope.friendRequests.splice(index, 1);
				console.log('yeye');
			}, function(error){
				console.log('Error while accepting a friend request');
			});	
		};

	}]);
};