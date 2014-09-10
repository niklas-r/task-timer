'use strict';

angular.module( 'taskTimer.home', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl as homeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data: {
      pageTitle: 'Home'
    }
  });
})

.controller( 'HomeCtrl', function HomeController( ) {

});
