angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor) {
	$scope.player = "Player Name";
	$scope.round = 1;
	$scope.score = 0;
	$scope.time = 700;

	$scope.submitScore = function() {
		Scores.insert($scope.score, function(err, id){
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