module.exports = function(module){
	module.controller('ChatCtrl', ['$scope', '$route', 'ChatService', function($scope, $route, ChatService){
		console.log('ChatCtrl');
		$scope.logout = function(){
			window.localStorage.clear();
			console.log('Successful');
			window.location.href = 'http://localhost:3000/#/';
		};
	}]);
};
