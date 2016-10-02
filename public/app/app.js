var helloWorldControllers = angular.module('helloWorldApp.controllers',[]);
var helloWorldAppServices = angular.module('helloWorldApp.services',[]);
require('./home/HomeCtrl.js')(helloWorldControllers);
require('./home/HomeService.js')(helloWorldAppServices);
require('./chat/ChatCtrl.js')(helloWorldControllers);
require('./chat/ChatService.js')(helloWorldAppServices);
angular.module('helloWorldApp',['ngRoute', 'helloWorldApp.controllers', 'helloWorldApp.services'])
.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "app/home/home.html", 
		controller: "HomeCtrl"
	})
	.when("/chat", {
		templateUrl: "app/chat/chat.html", 
		controller: "ChatCtrl"
	})
	.otherwise({redirectTo: '/'});
});