angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor) {
	$scope.player = "Current player's name goes here";
	$scope.round = 1;
	$scope.score = '';
	$scope.time = '5:00';


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