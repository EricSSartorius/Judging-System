angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $meteor) {
	$scope.player = "Player Name";
	$scope.round = 1;
	$scope.judge = "Judge Name";
	$scope.score = 0;
	$scope.time = 500;
	$scope.total = 100;
});