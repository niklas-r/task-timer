(function (angular) {
  'use strict';

  angular.module( 'taskTimer', [
    /////////////////////////////
    // Top modules with routes //
    /////////////////////////////
    'taskTimer.home',

    //////////////////////
    // Template modules //
    //////////////////////
    'templates-app',
    'templates-common',

    /////////////////////////
    // Third party modules //
    /////////////////////////
    'ui.router'
  ])

  .config( function myAppConfig ( $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/home' );
  })

  .controller( 'AppCtrl', function AppCtrl ( ) {

  });
}(angular));