'use strict';

var directives = angular.module('chatApp.directives', []);

/*
  Message directive displays error and info messages.
  This is done so as to provide a common error reporting UI across the entire application
*/
directives.directive('message', function() {
  return {
    restrict: 'E',
    scope: {
    	data: '='
    },
    templateUrl: '/partials/message.html'
  };
});

/*
  Implementation of history back button
  This is done so as to provide same back button across the entire application
*/
directives.directive('back', function() {
  return {
    template: '<button type="button" class="btn btn-info btn-sm" onclick="window.history.back()">Back</button>'
  };
});

