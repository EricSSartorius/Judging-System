angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({inGame:true});
	$scope.totalScore = 0;
	if ($scope.event) {
		var playerScore = $scope.$meteorCollection(function(){
			return Scores.find({eventId:$scope.event._id, playerId: $scope.event.players.id, score: $scope.score});
			// return Scores.aggregate([
			// 		{$match: { eventId: $scope.event._id, playerId: $scope.event.}}
			// 	]);
		});
	}
});
 