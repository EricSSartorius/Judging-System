angular.module('judging-system').controller('LeaderboardCtrl', function ($rootScope, $scope, $meteor) {
	window.scope=$scope;
	if($rootScope.recentEvent){
		$scope.events = $scope.$meteorCollection(function(){
			return Events.find({_id: $rootScope.recentEvent});
		});
		$scope.rank = "Rank";
		$scope.name = "Name";
		$scope.points = "Points";
	}
	else {
		$scope.noEvent = "No event currently running";
	}
});
