angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({_id: "DcjPnjyaeGuRZvrXk"});
	$scope.score = Scores.findOne({_id: "6dMF4Jy54uWsC2HkL"});
});