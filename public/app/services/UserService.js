module.exports = function(module){
	module.factory('UserService', ['$http', '$q','$window', function($http, $q, $window){
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

		service.logout = function(){
			var deferred = $q.defer();
			$http.get('http://localhost:3000/users/logout')
			.then(function(result){
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
