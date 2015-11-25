angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({_id: "DcjPnjyaeGuRZvrXk"});
});