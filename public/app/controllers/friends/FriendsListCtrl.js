module.exports = function(module){
	module.controller('FriendsListCtrl', ['$scope','UserService', function($scope,UserService){
		console.log('This is the FriendsListCtrl');

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