module.exports = function(module){
	module.factory('ChatService', ['$http', '$q', 'UserService', function($http, $q, UserService){
		var service = {};
		service.userData = {};
		service.messages = [];

		service.logout = function(user){
			var deferred = $q.defer();
			$http.get('/logout', user)
			.then(function(result){
				service.userData = {};
				deferred.resolve(service.userData);
			}, function(error){
				console.log('Error while logging out');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.createMessage = function(message){
			var deferred = $q.defer();
			$http.post('/messages', message)
			.then(function(result){
				deferred.resolve(result.data);
			}, function(error){
				console.log('Error while creating a message');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.listMessages = function(otherUser){
			var deferred = $q.defer();
			$http.get('/messages', {params: {otherUser: otherUser}})
			.then(function(result){
				deferred.resolve(result.data);
				service.messages = result.data;
			}, function(error){	
				console.log('Error while listing the messages');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		return service;
	}]);
};