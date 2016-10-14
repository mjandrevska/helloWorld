

module.exports = function(module){
	module.factory('PrimusService', ['$http', '$q', 'ChatService', function($http, $q, ChatService){

		var primus = Primus.connect();
		primus.on('open', function (spark) {
			console.log('connected!');
		  // spark is the new connection.
		});
		primus.on('data', function message(data) {
	  		console.log('Received a new message from the server', data);
	  		switch(data.type) {
	  			case 'message':
	  				console.log(ChatService.messages.length);
	  				ChatService.messages.push(data.data);
	  				console.log(ChatService.messages.length);
	  				break;
	  		}
		});
		return primus;
	}]);
};