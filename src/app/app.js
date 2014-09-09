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

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Task timer' ;
    }
  });

});
