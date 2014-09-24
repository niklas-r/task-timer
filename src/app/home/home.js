(function (angular) {
  'use strict';
  var homeModule,
      homeConfig,
      HomeController;

  homeModule = angular.module('taskTimer.home', [
    'taskTimer.clockCollection',
    'taskTimer.common.millisecondsToTimeString',
    'ui.router'
  ]);

  // @ngInject
  homeConfig = function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        main: {
          templateUrl: 'home/home.tpl.html',
          controller: 'HomeController as homeCtrl'
        }
      }
    });
  };

  // @ngInject
  HomeController = function ($scope, clockCollection) {
    var vm;

    vm = this;

    vm.newClockLabel = '';
    vm.clockCollection = [];

    vm.addNewStopWatch = function (label) {

      clockCollection.addNewStopWatch({
        label: label
      });

      vm.newClockLabel = '';
    };

    vm.removeClock = function (clock) {
      clockCollection.remove(clock);
    };

    $scope.$watch(function () { return clockCollection.collection; }, function (newCollection) {
      vm.clockCollection = newCollection;
    });
  };

  homeModule.config(homeConfig);
  homeModule.controller('HomeController', HomeController);
}(angular));