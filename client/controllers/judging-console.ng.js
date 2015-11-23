angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor) {
	$scope.player = "Player Name";
	$scope.score = 0;
	$scope.event = Events.findOne({_id: "DcjPnjyaeGuRZvrXk"});

	$scope.submitScore = function() {
		Scores.insert({score: $scope.score, eventId: $scope.event._id}, function(err, id){
			if (err) {
				console.log(err);
			} 
			else {
				$scope.$apply(function(){
					if (id) {
						return $scope.score;	
					}
				});
			}
		});
	}
});