module.exports = function(module){
	module.factory('ChatService', ['$http', '$q', function($http, $q){
		var service = {};
		service.userData = {};
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
		return service;
	}]);
};