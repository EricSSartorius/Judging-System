angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $meteor) {
	$scope.player = "current player's name goes here";
	$scope.round = "round goes here";
	$scope.judge = "judges names go here"
	$scope.score = "judge's submited score for the round goes here"
	$scope.time = 'time left in game goes here';
});