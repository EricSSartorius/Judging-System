angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $meteor) {
	$scope.events = Events.find({}, {sort: {createdAt: -1}}).fetch();
	$scope.event = $scope.events[0];
	$scope.eventId = {id: $scope.event._id, name: $scope.event.name};
	$scope.score = Scores.findOne({_id: "6dMF4Jy54uWsC2HkL"});
	$scope.totalScore = "100*";
	window.scope = $scope;

	$scope.getRoundTotal = function(){
	    var total = 0;
	    angular.forEach($scope.event.judges, function(judges) {
	        total += $scope.score.score;
	    });
	    return total;
	};
});