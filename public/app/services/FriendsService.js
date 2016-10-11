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

		service.createFriendships = function(friendId){
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

		service.getUsers = function(){
			var deferred = $q.defer();
			$http.get('http://localhost:3000/users')
			.then(function(result){
				deferred.resolve(result.data);
			}, function(error){
				console.log('Error while getting the users');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.getFriendships = function(query){
			var deferred = $q.defer();
			console.log('this is the getFriendships method');
			$http.get('http://localhost:3000/friends', query)
			.then(function(result){
				console.log(result.data);
				deferred.resolve(result.data);
			}, function(error){
				console.log('Error while getting the friendships');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.getFriendRequests = function(query){
			var deferred = $q.defer();
			console.log('this is the method for getting the friend requests');
			$http.get('http://localhost:3000/friends', {query: 'friend_requests'})
			.then(function(result){
				console.log('Successfully getting the friend requests');
				console.log('Result data', result.data);
				deferred.resolve(result.data);
			}, function(error){
				console.log('error while getting the friend requests');
				deferred.reject(error);
			});
			return deferred.promise;
		};


		return service;
	}]);
};