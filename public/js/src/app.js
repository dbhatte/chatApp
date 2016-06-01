'use strict';

var chatApp = angular.module('chatApp', ['ngRoute', 'chatApp.controllers', 'chatApp.directives']);

var socket = io();

chatApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
    when('/', {
      templateUrl: 'partials/login.html',
      controller: 'LoginScreenController'
    }).
    when('/chat', {
      templateUrl: 'partials/chat.html',
      controller: 'ChatController',
      resolve: {
        messageList: ['ChatService', function(ChatService){
          return ChatService.getAll();
        }]
      }
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

