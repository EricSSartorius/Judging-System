angular.module('judging-system').controller('MatchHistoryCtrl', function ($scope, $meteor) {

	//Match history section unfinshed
	$scope.events = Events.find({}, {sort: {createdAt: -1}}).fetch();
	$scope.event = $scope.events[0];
	$scope.eventId = {id: $scope.event._id, name: $scope.event.name};
	window.scope = $scope;
	$scope.scores = Scores.find({eventId:$scope.event._id }).fetch();
});