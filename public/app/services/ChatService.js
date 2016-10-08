module.exports = function(module){
	module.factory('ChatService', ['$http', '$q', function($http, $q){
		var service = {};
		service.userData = {};
		//service.messages = {};

		service.logout = function(user){
			var deferred = $q.defer();
			$http.get('http://localhost:3000/users/logout', user)
			.then(function(result){
				console.log('Logging out and cleaning the user data');
				service.userData = {};
				deferred.resolve(service.userData);
			}, function(error){
				console.log('Error while logging out');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.createMessage = function(message){
			console.log('Create Messg');
			var deferred = $q.defer();
			$http.post('http://localhost:3000/messages', message)
			.then(function(result){
				console.log('Successfully created a message');
				//service.messages = result.data;
				deferred.resolve(result.data);
				console.log('Result data', result.data);
			}, function(error){
				console.log('Error while creating a message');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		return service;
	}]);
};