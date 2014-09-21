(function (angular) {
  'use strict';
  var mod,
      millisecondsToTimeStringFilter;

  mod = angular.module('taskTimer.common.millisecondsToTimeString', []);

  millisecondsToTimeStringFilter = function () {
    return function (input) {
      var formattedTimeString,
          MS_IN_ONE_HOUR,
          MS_IN_ONE_MINUTE,
          MS_IN_ONE_SECOND;

      MS_IN_ONE_HOUR = 3600000;
      MS_IN_ONE_MINUTE = 60000;
      MS_IN_ONE_SECOND = 1000;

      formattedTimeString = [];

      // Calucalte hours
      formattedTimeString[0] = Math.floor(input / MS_IN_ONE_HOUR);
      input -= ( formattedTimeString[0] * MS_IN_ONE_HOUR );

      // Calculate minutes
      formattedTimeString[1] = Math.floor(input / MS_IN_ONE_MINUTE);
      input -= ( formattedTimeString[1] * MS_IN_ONE_MINUTE );

      // Calculate seconds
      formattedTimeString[2] = Math.floor(input / MS_IN_ONE_SECOND);
      input -= ( formattedTimeString[2] * MS_IN_ONE_SECOND );

      formattedTimeString.forEach(function (str, i) {
        str += '';
        formattedTimeString[i] = ( str.length > 1 ) ? str : '0' + str;
      });

      return formattedTimeString.join(':');
    };
  };

  mod.filter('millisecondsToTimeString', millisecondsToTimeStringFilter);

}(angular));