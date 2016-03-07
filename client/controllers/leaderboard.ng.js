angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({inGame:true});
	$scope.currentUser = Meteor.userId();
	window.scope=$scope;
	if ($scope.event && $scope.currentUser === event.author) {
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
