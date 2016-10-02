var helloWorldControllers = angular.module('helloWorldApp.controllers',[]);
var helloWorldAppServices = angular.module('helloWorldApp.services',[]);
require('./home/HomeCtrl.js')(helloWorldControllers);
require('./home/HomeService.js')(helloWorldAppServices);
require('./profile/ProfileCtrl.js')(helloWorldControllers);
require('./profile/ProfileService.js')(helloWorldAppServices);
angular.module('helloWorldApp',['ngRoute', 'helloWorldApp.controllers', 'helloWorldApp.services'])
.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "app/home/home.html", 
		controller: "HomeCtrl"
	})
	.when("/profile", {
		templateUrl: "app/profile/profile.html", 
		controller: "ProfileCtrl"
	})
	.otherwise({redirectTo: '/'});
});