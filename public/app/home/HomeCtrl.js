var helloWorldApp = angular.module('helloWorldApp.controllers', [])

.controller('HomeCtrl', function($scope){
	console.log('This is the main controller');
});