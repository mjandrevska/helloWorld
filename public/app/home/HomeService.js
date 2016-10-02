module.exports = function(module){
	module.factory('HomeService', ['$http', '$q', function($http, $q){
		var service = {};
		service.userData = {};

		service.createUser = function(user){
			var deferred = $q.defer();
			$http.post('http://localhost:3000/users', user)
			.then(function(res){
				service.userData = res.data;
				deferred.resolve(service.userData);
				console.log('The new user is created');
			}, function(error){
				console.log('There is an error');
				deferred.reject(error);
			});
			return deferred.promise;
		};
		return service;
	}]);
};
