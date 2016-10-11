module.exports = function(module){
	module.factory('FriendsService',['$http', '$q', '$window', function($http, $q, $window){
		var service = {};
		
		service.deleteFriends = function(friendId){
			var deffered = $q.defer();
			$http.delete('http://localhost:3000/friends/' +friendId)
			.then(function(result){
				console.log(result);
				console.log('Deleted the friends');
				deffered.resolve();
			}, function(error){
				console.log('There is an error while trying to delete a friend');
				deffered.reject(error);
			});	
			return deffered.promise;
		};

		service.createFriendship = function(friendId){
			console.log('createFriendship service method');
			var deffered = $q.defer();
			console.log({toUser: friendId});
			$http.post('http://localhost:3000/friends', {toUser: friendId})
			.then(function(result){
				console.log('Result',result);
				console.log('Result data:',result.data);
				deffered.resolve(result.data);
				console.log('Created a new friendship');
			}, function(error){
				console.log('There is an error while trying to create a new friendship');
				deffered.reject(error);
			});
			return deffered.promise;
		};

		return service;
	}]);
};