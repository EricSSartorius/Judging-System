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
    })
    .state('createEvent', {
      url: '/create-event',
      templateUrl: 'client/views/create-event.ng.html',
      controller: 'CreateEventCtrl'
    })
    .state('eventForm', {
            url: "/eventForm",
            template: UiRouter.template('eventForm.html')
    });
  $urlRouterProvider.otherwise("/home");
});