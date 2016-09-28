angular.module('helloWorldApp',['helloWorldApp.controllers','ngRoute'])
.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "app/home/home.html", 
		controller: "HomeCtrl"
	})
	.when("/profile/:id", {
		templateUrl: "app/profile/profile.html", 
		controller: "ProfileCtrl"
	})
	.otherwise({redirectTo: '/'});
});