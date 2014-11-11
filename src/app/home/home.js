(function (angular) {
  'use strict';
  var homeModule;

  homeModule = angular.module('taskTimer.home', [
    'taskTimer.stopWatch',
    'ui.router'
  ]);

  homeModule.config(homeConfig);
  // @ngInject
  function homeConfig ($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        main: {
          templateUrl: 'home/home.tpl.html',
          controller: 'HomeController as homeCtrl'
        }
      }
    });
  }

  homeModule.controller('HomeController', HomeController);
  // @ngInject
  function HomeController($scope, clockCollection) {
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
  }

}(angular));