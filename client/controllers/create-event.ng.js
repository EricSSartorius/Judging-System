angular.module('judging-system').controller('CreateEventCtrl', function ($scope, $meteor) {
 	$scope.event = {
      name: '',
      timeLimitMin: '',
      timeLimitSec: '',
      rounds: 1
    };
    $scope.player = {
      name: '',
      team: ''
    };
    $scope.judge = {
      name: '',
      category: ''
    };

    $scope.rounds = [
          1,
          2,
          3,
      ];
  });