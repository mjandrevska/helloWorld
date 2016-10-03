var helloWorldControllers = angular.module('helloWorldApp.controllers',[]);
var helloWorldAppServices = angular.module('helloWorldApp.services',[]);
require('./controllers/home/HomeCtrl.js')(helloWorldControllers);
require('./services/HomeService.js')(helloWorldAppServices);
require('./controllers/chat/ChatCtrl.js')(helloWorldControllers);
require('./services/ChatService.js')(helloWorldAppServices);
require('./services/UserService.js')(helloWorldAppServices);
angular.module('helloWorldApp',['ngRoute', 'helloWorldApp.controllers', 'helloWorldApp.services'])
.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "app/partials/home.html", 
		controller: "HomeCtrl"
	})
	.when("/chat", {
		templateUrl: "app/partials/chat.html", 
		controller: "ChatCtrl"
	})
	.otherwise({redirectTo: '/'});
});