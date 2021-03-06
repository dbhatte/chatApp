'use strict';

var services = angular.module('services', ['ngResource', 'ngCookies']);

/*
	This service is used to share the details of currently logged-in user between controllers
*/
services.factory('LoggedInUser', ['$cookies', function($cookies){
	return {
		setUser: function(_user){
	        $cookies.put('userName', _user);
		},
		getUser: function(){
			return $cookies.get('userName');
		}
	}

}]);


services.factory('ChatService', function(){
	return {
		sendMessage: function(message){
	        socket.emit('chat message', message);
		}
	}

});
/*
	This service exposes abort functionality to the controllers
*/
services.factory('logout', ['$timeout', '$location', function($timeout, $location){

	return function(callback){
        $timeout(function (){
            $location.path('/app');
            callback();
        }, 2000);
	}
	
}]);

/*
	This service creates message object for displaying with message directive
*/
services.factory('MessageService', function(){

	return {
		getMessageObject: function(_messageText, _isError, _isInfo){
			return {
				messageText : _messageText,
        		isError : _isError,
        		isInfo : _isInfo
        	};
		}
	}
	
});
