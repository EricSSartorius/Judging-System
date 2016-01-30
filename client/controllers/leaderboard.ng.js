angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({inGame:true});
	window.scope=$scope;
	if ($scope.event) {
		$scope.title = "Rank   Name   Points";

		$scope.events = $scope.$meteorCollection(function(){
			// debugger
			// return $scope.event.players;
			return Events.find({inGame:true});
		});
	// 	var playerScore = $scope.$meteorCollection(function(){
	// 		$scope.event.find({"players.totalScore": $scope.totalScore});
	// 	});
	}
});
 