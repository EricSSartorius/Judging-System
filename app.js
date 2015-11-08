if (Meteor.isClient) {
	angular.module('judging-system', ['angular-meteor', 'ui.router']); 
	angular.module('judging-system').config(function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('landing', {
          url: '/landing',
          templateUrl: 'landing.ng.html',
          controller: 'LandingCtrl'
        })
        .state('judgingConsole', {
          url: '/judging-console',
          templateUrl: 'judging-console.ng.html',
          controller: 'JudgingConsoleCtrl'
        });

      $urlRouterProvider.otherwise("/landing");
    });
  
   angular.module('judging-system').controller('LandingCtrl', function ($scope, $meteor) {
     $scope.title = "Landing";
   });
   angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor) {
     $scope.judge = "Judging Console";
   });
 }