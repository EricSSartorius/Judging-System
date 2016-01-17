angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({inGame:true});
	// if ($scope.event) {
	// 	var playerScore = $scope.$meteorCollection(function(){
	// 		$scope.event.find({"players.totalScore": $scope.totalScore});
	// 	});
	// }
});
 