angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({inGame:true});
	if ($scope.event) {
		$scope.title = "Rank   Name   Points";
	// 	var playerScore = $scope.$meteorCollection(function(){
	// 		$scope.event.find({"players.totalScore": $scope.totalScore});
	// 	});
	}
});
 