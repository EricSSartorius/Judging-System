angular.module('judging-system').controller('MatchHistoryCtrl', function ($scope, $meteor) {
	$scope.events = Events.find({}, {sort: {createdAt: -1}}).fetch();
	$scope.event = $scope.events[0];
	$scope.eventId = {id: $scope.event._id, name: $scope.event.name};
	window.scope = $scope;
	// $scope.scores = Scores.find({}, {sort: {createdAt: -1}}).fetch();
});