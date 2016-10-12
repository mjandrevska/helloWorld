module.exports = function(module){
	module.factory('FriendsService',['$http', '$q', '$window','$route','UserService',function($http, $q, $window,$route,UserService){
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
			$http.get('http://localhost:3000/friends', {params: {type: 'friend_requests'}})
			.then(function(result){
				console.log('Successfully getting the friend requests');
				console.log('My userData:', UserService.userData);
				for(var i=0; i<result.data.length; i++){
					console.log('Result data fromUser id:',result.data[i].fromUser._id);
					if(result.data[i].fromUser._id === UserService.userData._id){
						console.log('This is my id and I am the fromUser');
						result.data[i].other = result.data[i].toUser;
						console.log('result data other', result.data[i].toUser);
					}
					else{
						console.log('This is not me and I am the toUser');
						result.data[i].other = result.data[i].fromUser;
						console.log('result data other:', result.data[i].fromUser);
					}
				}
				deferred.resolve(result.data);
			}, function(error){
				console.log('error while getting the friend requests');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.getMyFriends = function(query){
			var deferred = $q.defer();
			console.log('This is the method for getting my friends (accepted)');
			$http.get('http://localhost:3000/friends', {params: {type: 'friends'}})
			.then(function(result){
				console.log('Successfully getting my friends (accepted)');
				for(var i=0; i<result.data.length; i++){
					console.log('Result data fromUser id:',result.data[i].fromUser._id);
					if(result.data[i].fromUser._id === UserService.userData._id){
						console.log('This is my id and I am the fromUser');
						result.data[i].other = result.data[i].toUser;
						console.log('result data other', result.data[i].toUser);
					}
					else{
						console.log('This is not me and I am the toUser');
						result.data[i].other = result.data[i].fromUser;
						console.log('result data other:', result.data[i].fromUser);
					}
				}
				deferred.resolve(result.data);
			}, function(error){
				console.log('Error while getting my friends');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.acceptRequest = function(friendId){
			var deferred = $q.defer();
			console.log('This is the method for accepting friend requests');
			console.log('friendId:',friendId);
			$http.put('http://localhost:3000/friends/' +friendId)
			.then(function(result){
				console.log('friendId:',friendId);
				console.log('Sucess while accepting a friend request');
				deferred.resolve(result.data);
			}, function(error){
				console.log('Error while trying to accept a friend request');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		return service;
	}]);
};