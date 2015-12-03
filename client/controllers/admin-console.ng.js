angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $interval, $meteor) {
	$scope.events = Events.find({}, {sort: {createdAt: -1}}).fetch();
	$scope.event = $scope.events[0];
	$scope.eventId = {id: $scope.event._id, name: $scope.event.name};
	$scope.score = Scores.findOne({_id: "6dMF4Jy54uWsC2HkL"});
	$scope.totalScore = "100*";
  	$scope.roundTime = $scope.event.timeLimit;
  	$scope.startButton = true;
  	$scope.nextButton = true;
  	$scope.event.currentPlayerId = $scope.event.players[0].id;
	window.scope = $scope;

	$scope.getRoundTotal = function(){
	    var total = 0;
	    angular.forEach($scope.event.judges, function(judges) {
	        total += $scope.score.score;
	    });
	    return total;
	};
	$scope.startTimer = function() {
        theTimer = $interval(function(){	
	        $scope.roundTime--;
	        if ($scope.roundTime <0) {
		        $interval.cancel(theTimer);
		        $scope.roundTime = 0;
		    }
	    },1000,0);  
	}; 
	$scope.startPlayer = function() {
		if ($scope.event.players[0].id === "player1" && $scope.event.currentRound === 1) {
			Events.update(scope.event._id, {$set: {inGame: true }});
		}
		// Events.update(scope.event._id, {$set: {currentplayerId: scope.event.players.[0].id }});

		$scope.startTimer();
		$scope.startButton = false;
	};
	$scope.endPlayer = function() {
		$interval.cancel(theTimer);
		$scope.roundTime = 0;
		$scope.startButton = true;
	};
	$scope.nextPlayer = function() {
		//Player array index ++
		$scope.roundTime = $scope.event.timeLimit;
		//set new player ID to currentPlayer ID
		//if all players have played, hide next player button, show next round button
			//if all rounds have finished too then also hide next round button
	};
	$scope.nextRound = function() {
		Events.update(scope.event._id, {$set: {currentRound: scope.event.currentRound++ }});
		$scope.roundTime = $scope.event.timeLimit;
		$scope.event.currentPlayerId = $scope.event.players[0].id;
		//hide next round button, show next player button
			//if on last person in array and last round then hide next player button too
	};
	$scope.endGame = function() {
		Events.update(scope.event._id, {$set: {inGame: false }});
	};
});