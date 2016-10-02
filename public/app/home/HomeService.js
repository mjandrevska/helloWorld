module.exports = function(module){
	module.factory('HomeService', ['$http', '$q','$window', function($http, $q, $window){
		var service = {};
		service.userData = {};

		service.createUser = function(user){
			var deferred = $q.defer();
			$http.post('http://localhost:3000/users', user)
			.then(function(res){
				service.userData = res.data;
				console.log('Res Data',res.data);
				window.localStorage.setItem('userData', JSON.stringify(service.userData));
				deferred.resolve(service.userData);
				console.log('The new user is created');
			}, function(error){
				console.log('There is an error');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.login = function(user){
			var deferred = $q.defer();
			$http.post('http://localhost:3000/users/login', user)
			.then(function(res){
				service.userData = res.data;
				console.log('Res Data',res.data);
				localStorage.setItem('userData', JSON.stringify(service.userData));
				deferred.resolve(service.userData);
				console.log('logged in');
			}, function(error){
				console.log('Error while logging');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.logout = function(user){
			console.log('This is the logout method');
			window.localStorage.clear();
			$window.location.href = 'http://localhost:3000/#/';
		};
		return service;
	}]);
};
