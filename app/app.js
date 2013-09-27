angular.module('TaskTimer', [
  'ui.router'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('index', {
      url: '/',
      controller: 'IndexCtrl',
      templateUrl: 'app/index/index.tpl.html'
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }
])