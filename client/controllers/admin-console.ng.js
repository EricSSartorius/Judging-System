angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $meteor) {
	$scope.events = Events.find().fetch();
	$scope.event = Events.find({currentGame:true});
	$scope.score = Scores.findOne({_id: "6dMF4Jy54uWsC2HkL"});
	$scope.totalScore = "100*";

	$scope.chooseEvent = function(){
		Events.update($scope.event._id, {$set: {currentGame: true }});
	};

	$scope.getRoundTotal = function(){
	    var total = 0;
	    angular.forEach($scope.event.judges, function(judges) {
	        total += $scope.score.score;
	    });
	    return total;
	};
});