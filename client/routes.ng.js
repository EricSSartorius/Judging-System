angular.module("judging-system").run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('home');
    }
  });
  Accounts.onLogin(function() {
    $state.go('adminConsole');
  });
  Accounts.onLogout(function() {
    $state.go('home');
  });
});

angular.module('judging-system').config(function($urlRouterProvider, $stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
    // .state('sidebar', {
    //   url: '',
    //   templateUrl: 'client/views/sidebar.ng.html',
    //   controller: 'SidebarCtrl'
    // })
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
    .state('adminConsole', {
      url: '/admin-console',
      templateUrl: 'client/views/admin-console.ng.html',
      controller: 'AdminConsoleCtrl',
      resolve: {
        "currentUser": function($meteor){
          return $meteor.requireUser();
        }
      }
    })
    .state('leaderboard', {
      url: '/leaderboard',
      templateUrl: 'client/views/leaderboard.ng.html',
      controller: 'LeaderboardCtrl',
      resolve: {
        "currentUser": function($meteor){
          return $meteor.requireUser();
        }
      }
    })
    .state('quickScoreboard', {
      url: '/quick-scoreboard',
      templateUrl: 'client/views/quick-scoreboard.ng.html',
      controller: 'QuickScoreboardCtrl'
    })
    .state('matchHistory', {
      url: '/match-history',
      templateUrl: 'client/views/match-history.ng.html',
      controller: 'MatchHistoryCtrl',
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
