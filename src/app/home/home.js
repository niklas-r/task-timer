(function (angular) {
  'use strict';
  var homeModule;

  homeModule = angular.module('taskTimer.home', [
    'taskTimer.task.collection',
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
  function HomeController($scope, taskCollection) {
    var vm;

    vm = this;

    vm.newTask = {
      label: ''
    };

    vm.taskCollection = [];

    vm.addNewStopWatch = function addNewStopWatch(task) {

      taskCollection.addNewStopWatch(task);

      vm.newTask.label = '';
    };

    vm.removeTask = function removeTask(task) {
      taskCollection.remove(task);
    };

    $scope.$watch(
      function () { return taskCollection.collection; },
      function (newCollection) {
        vm.taskCollection = newCollection;
    });
  }

}(angular));