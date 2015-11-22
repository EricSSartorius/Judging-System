angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $meteor) {
	$scope.eventName = "Event Name";
	$scope.playerName = "Player Name";
	$scope.round = 1;
	$scope.judge = "Judge Name";
	$scope.score = 0;
	$scope.roundScore = 15;
	$scope.totalScore = 100;
});