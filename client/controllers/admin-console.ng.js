angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $meteor) {
	$scope.events = Events.find().fetch();
	$scope.event = Events.findOne({_id: "kWgQJXysoXhpF2GiC"});
	$scope.round = 1;
	$scope.judge = "Judge Name";
	$scope.score = 0;
	$scope.roundScore = 15;
	$scope.totalScore = 100;
});