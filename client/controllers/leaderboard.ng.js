angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({inGame:true});
	window.scope=$scope;
	if ($scope.event) {
		$scope.rank = "Rank";
		$scope.name = "Name";
		$scope.points = "Points";

		$scope.events = $scope.$meteorCollection(function(){
			return Events.find({inGame:true});
		});
	}
	else {
		$scope.noEvent = "No event currently running";
	}
});
 