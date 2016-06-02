'use strict';

var chatApp = angular.module('chatApp', ['ngRoute', 'chatApp.controllers', 'chatApp.directives']);

var socket = io();

chatApp.config(['$routeProvider', '$cookiesProvider', function($routeProvider, $cookiesProvider){
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

    $cookiesProvider.defaults.expires = "Tue, 15-Aug-2017 15:00:24 GMT"
}]);

if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function() { console.log('Service Worker Registered'); });
}