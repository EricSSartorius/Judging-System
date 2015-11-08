angular.module('judging-system').config(function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('landing', {
          url: '/landing',
          templateUrl: 'client/views/landing.ng.html',
          controller: 'LandingCtrl'
        })
        .state('judgingConsole', {
          url: '/judging-console',
          templateUrl: 'client/views/judging-console.ng.html',
          controller: 'JudgingConsoleCtrl'
        });

      $urlRouterProvider.otherwise("/landing");
    });