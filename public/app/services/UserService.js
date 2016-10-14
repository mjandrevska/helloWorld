module.exports = function(module){
	module.factory('UserService', ['$http', '$q','$window', function($http, $q, $window){
		var service = {};
		service.userData = {};
		service.getUserData = function(){
			var data = $window.localStorage && $window.localStorage.getItem('userData');
			if(data){
				service.userData = JSON.parse(data);
			}
		};

		service.getUserData();
		
		service.createUser = function(user){
			var deferred = $q.defer();
			$http.post('/users', user)
			.then(function(res){
				service.userData = res.data;
				window.localStorage.setItem('userData', JSON.stringify(service.userData));
				deferred.resolve(service.userData);
			}, function(error){
				console.log('There is an error');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.login = function(user){
			var deferred = $q.defer();
			$http.post('/users/login', user)
			.then(function(res){
				service.userData = res.data;
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
			$http.get('/users/logout')
			.then(function(result){
				service.userData = {};
				deferred.resolve(service.userData);
			}, function(error){
				console.log('Error while logging out');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.getUsers = function(){
			var deferred = $q.defer();
			$http.get('/users')
			.then(function(result){
				deferred.resolve(result.data);
			}, function(error){
				console.log('Error while getting the users');
				deferred.reject(error);
			});
			return deferred.promise;
		};

		return service;
	}]);
};
