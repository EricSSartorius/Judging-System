angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor) {
	$scope.player = "Current player's name goes here";
	$scope.round = 1;
	$scope.score = '';
	$scope.time = '5:00';
	
	$scope.score1 = 5;
	$scope.disabled = 50;
});