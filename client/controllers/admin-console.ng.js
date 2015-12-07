angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $interval, $meteor) {
	var index = 0;
	$scope.events = Events.find({}, {sort: {createdAt: -1}}).fetch();
	$scope.event = $scope.events[0];
	$scope.eventId = {id: $scope.event._id, name: $scope.event.name};
	$scope.totalScore = "100*";
  	$scope.roundTime = $scope.event.timeLimit;
  	$scope.startButton = true;
  	$scope.nextPlayerButton = true;
  	$scope.nextRoundButton = false;
  	$scope.event.currentPlayerId = $scope.event.players[0].id;
  	$scope.event.currentRound = 1;
	$scope.scores = Scores.find({eventId:$scope.event._id, playerId: $scope.event.currentPlayerId, round: $scope.event.currentRound}).fetch();
  	Events.update($scope.event._id, {$set: {inGame: false}});
  	Events.update($scope.event._id, {$set: {currentPlayerId: $scope.event.currentPlayerId }});
  	Events.update($scope.event._id, {$set: {currentRound: $scope.event.currentRound }});
	window.scope = $scope;
	
	$scope.getRoundTotal = function(){
	    var total = 0;
	    angular.forEach($scope.event.judges, function(judge) {
		    var score = $scope.scores.find(function(score) { 
		    	return judge.id === score.judgeId; 
		    });
		    if (score === undefined) return;
	        total += score.score;
	    });
	    return total;
	};
	$scope.getJudge = function(score) {
		return $scope.event.judges.find(function(judge){return judge.id === score.judgeId;});
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
			Events.update(scope.event._id, {$set: {inGame: true}});
		}
		$scope.startTimer();
		$scope.startButton = false;
	};
	$scope.endPlayer = function() {
		$interval.cancel(theTimer);
		$scope.roundTime = 0;
		$scope.startButton = true;
	};
	$scope.nextPlayer = function() {
		index++;
		$scope.event.currentPlayerId = $scope.event.players[index].id;
		$scope.roundTime = $scope.event.timeLimit;
		Events.update(scope.event._id, {$set: {currentPlayerId: scope.event.currentPlayerId }});
		if(index + 1 === $scope.event.players.length) {
			if( $scope.event.currentRound === $scope.event.rounds) {
				$scope.nextRoundButton = false;
				$scope.nextPlayerButton = false;
			}
			else {
				$scope.nextPlayerButton = false;
				$scope.nextRoundButton = true;
			}
		}
	};
	$scope.nextRound = function() {
		$scope.event.currentRound++;
		Events.update(scope.event._id, {$set: {currentRound: scope.event.currentRound }});
		$scope.roundTime = $scope.event.timeLimit;
		$scope.event.currentPlayerId = $scope.event.players[0].id;
		Events.update(scope.event._id, {$set: {currentPlayerId: scope.event.currentPlayerId }});
		index=0;
		$scope.nextPlayerButton = true;
		$scope.nextRoundButton = false;
		if(index + 1 === $scope.event.players.length && $scope.event.currentRound === $scope.event.rounds) {
			$scope.nextRoundButton = false;
			$scope.nextPlayerButton = false;
		}
	};
	$scope.endGame = function() {
		Events.update(scope.event._id, {$set: {inGame: false }});
	};
});
