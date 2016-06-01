'use strict';

var controllers = angular.module('chatApp.controllers', ['chatApp.services']);

/*
    Main Controller implements abort functionality which is shared by all child controllers
*/
controllers.controller('MainController', ['$scope', 'MessageService', 'logout', 
    function ($scope, MessageService, logout){

    $scope.abort = function(){
        $scope.messageObject = MessageService.getMessageObject("Aborting. Please wait", false, true);
        logout(function(){
            $scope.messageObject = MessageService.getMessageObject("Please take your card", false, true);
        });
    };

   
}]);

controllers.controller('LoginScreenController', ['$scope', '$location', 'LoggedInUser', 'MessageService',
    function ($scope, $location, LoggedInUser, MessageService){


    if (angular.isDefined(LoggedInUser.getUser())) {
        broadcastAndRedirect();
    }   

    function broadcastAndRedirect(){
        socket.emit('user connected', LoggedInUser.getUser());
        $location.path('/chat');   
    }

   $scope.login = function() {
        $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);

        // If form is not valid, there is no reason to check business specific validations yet
        if (!$scope.loginform.$valid){
            return;
        }
        console.log($scope.username);
        LoggedInUser.setUser($scope.username);
        broadcastAndRedirect();          
        
    };

    $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);

}]);


controllers.controller('ChatController', ['$scope', 'LoggedInUser', 'ChatService', 'messageList',
    function ($scope, LoggedInUser, ChatService, messageList){

    $scope.messageList = messageList.data;
    $scope.currentUser = LoggedInUser.getUser();
    /*$scope.messageList.data.forEach(function(msg){
        if (msg.username !== LoggedInUser.getUser()) {
            $('#messages').append($('<li>').text(msg.username + ": "+ msg.message));
        }
        else {
            $('#messages').append($('<li style="text-align: right;">').text(msg.username + ": "+ msg.message));
        }
    });*/

    socket.on('chat message', function(msg){
        if (msg.username !== LoggedInUser.getUser()) {
            $('#messages').append($('<li>').text(msg.username + ": "+ msg.message));
        }
    });

    $scope.sendMessage = function(){
        $('#messages').append($('<li class="right">').text($scope.currentUser + ": "+ $scope.message));
        ChatService.sendMessage({username: $scope.currentUser, message: $scope.message});
        $scope.message = "";
    };

}]);

