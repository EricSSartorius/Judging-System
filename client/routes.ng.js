angular.module("judging-system").run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('home');
    }
  });
});

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
      controller: 'JudgingConsoleCtrl',
      resolve: {
        "currentUser": function($meteor){
          return $meteor.requireUser();
        }
      }
    })
    .state('createEvent', {
      url: '/create-event',
      templateUrl: 'client/views/create-event.ng.html',
      controller: 'CreateEventCtrl',
      resolve: {
        "currentUser": function($meteor){
          return $meteor.requireUser();
        }
      }
    });
  $urlRouterProvider.otherwise("/home");
});