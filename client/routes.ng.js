angular.module('judging-system').config(function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'client/views/home.ng.html',
          controller: 'HomeCtrl'
        })
        .state('judgingConsole', {
          url: '/judging-console',
          templateUrl: 'client/views/judging-console.ng.html',
          controller: 'JudgingConsoleCtrl'
        });

      $urlRouterProvider.otherwise("/home");
    });