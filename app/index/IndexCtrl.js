angular.module('TaskTimer')
.controller('IndexCtrl', [
  '$scope',
  '$timeout',
  function ($scope, $timeout) {
    $scope.timer = new Date().toUTCString();
  }
]);