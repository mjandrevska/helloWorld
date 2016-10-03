module.exports = function(module){
	module.controller('ChatCtrl', ['$scope', '$route', 'UserService', '$window',function($scope, $route, UserService,$window){
		console.log('ChatCtrl');
		$scope.logout = function(){
			UserService.logout()
			.then(function(res){
				window.localStorage.clear();
				console.log('Successful');
				window.location.href = 'http://localhost:3000/#/';
			}, function(error){
				console.log('Error for log out');
			});
		};
	}]);
};
