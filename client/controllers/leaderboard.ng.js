angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({inGame:true});
	$scope.totalScore = 0;
	if ($scope.event) {
		var playerScore = $scope.$meteorCollection(function(){
			return Scores.find({eventId:$scope.event._id, playerId: $scope.event.players.id, score: $scope.score});
		});
		for(var i=0; i<playerScore.length; i++){
			$scope.totalScore += playerScore[i].score;
		}
	}


});
 