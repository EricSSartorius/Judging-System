angular.module('judging-system').controller('LeaderboardCtrl', function ($rootScope, $scope, $meteor) {
	window.scope=$scope;
	if($rootScope.recentEvent){
		$scope.events = $scope.$meteorCollection(function(){
			return Events.find({_id: $rootScope.recentEvent});
		});
		$scope.rank = "Rank";
		$scope.name = "Name";
		$scope.points = "Points";
		var sortedScores = $scope.events[0].players.sort(function(a,b){
			return b.totalScore - a.totalScore;
		});
		$scope.tie = sortedScores[1].totalScore === sortedScores[0].totalScore;
	}
	else {
		$scope.noEvent = "No event currently running";
	}
});
