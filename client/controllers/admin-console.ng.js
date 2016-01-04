angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $interval, $meteor, TimeFactory) {
	var index;

	function getTotalScore(){
		var playerScores = $scope.$meteorCollection(function(){
			return Scores.find({eventId:$scope.event._id, playerId: $scope.event.currentPlayerId});
		});
		$scope.totalScore = 0;
		for(var i=0; i<playerScores.length; i++){
			$scope.totalScore += playerScores[i].score;
		}
	};
	
	initializeVar();

	function startMyTimer(){
		theTimer = $interval(function(){
	        	$scope.roundTime = TimeFactory.getCurrentTime();
	        	Events.update($scope.event._id, {$set: {currentTime: TimeFactory.getCurrentTime() }});
		        if ($scope.roundTime <= 0) {
		        	$scope.stopButton = false;
		        	TimeFactory.cancelTheTimer();
			        $interval.cancel(theTimer);
			        $scope.roundTime = 0;
			    }
		    },1000,0);  
	};
	function initializeVar() {
		$scope.events = Events.find({}, {sort: {createdAt: -1}}).fetch();
		$scope.event = $scope.events[0];
		$scope.eventId = {id: $scope.event._id, name: $scope.event.name};
		window.scope = $scope;
		$scope.scores = $scope.$meteorCollection(function(){
	        return Scores.find({eventId:$scope.event._id, playerId: $scope.event.currentPlayerId, round: $scope.event.currentRound});
		});
		if (!$scope.event.inGame) {
			index = 0;
			$scope.totalScore = 0;
		  	$scope.roundTime = $scope.event.timeLimit;
		  	TimeFactory.setCurrentTime($scope.event.timeLimit);
		  	$scope.startButton = true;
		  	$scope.stopButton = false;
		  	$scope.nextPlayerButton = true;
		  	$scope.nextRoundButton = false;
		  	$scope.event.currentPlayerId = $scope.event.players[0].id;
		  	$scope.event.currentRound = 1;
		  	Events.update($scope.event._id, {$set: {inGame: false}});
		  	Events.update($scope.event._id, {$set: {currentPlayerId: $scope.event.currentPlayerId }});
		  	Events.update($scope.event._id, {$set: {currentRound: $scope.event.currentRound }});
		}
		else {
			getTotalScore();
			for(var i in $scope.event.players){
				if($scope.event.players[i].id === $scope.event.currentPlayerId){ index = Number(i) };
			}
			$scope.roundTime = TimeFactory.getCurrentTime();
			if($scope.roundTime===$scope.event.timeLimit){
				$scope.startButton = true;
		  		$scope.stopButton = false;
		  	}
		  	else if ($scope.roundTime <= 0) {
		  		$scope.startButton = false;
		  		$scope.stopButton = false;
		  	}
		  	else{
		  		$scope.startButton = false;
		  		$scope.stopButton = true;
		  	}
		  	if(index + 1 === $scope.event.players.length && $scope.event.currentRound === $scope.event.rounds) {
				$scope.nextRoundButton = false;
				$scope.nextPlayerButton = false;
			}
			else if((index + 1) === $scope.event.players.length){
				$scope.nextRoundButton = true;
				$scope.nextPlayerButton=false;
			}
			else {
				$scope.nextPlayerButton = true;
				$scope.nextRoundButton = false;
			}
			startMyTimer();
		} 
	}
	$scope.updateEventDetails = function() {
		Events.update($scope.event._id, {$set: {inGame: false}});
		initializeVar();
	};
	$scope.updateScores = function() {
		$scope.scores = $scope.$meteorCollection(function(){
	        return Scores.find({eventId:$scope.event._id, playerId: $scope.event.currentPlayerId, round: $scope.event.currentRound});
	    });
	};
	$scope.getRoundTotal = function() {
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
	$scope.getPlayerName = function(){
		return $scope.event.players.find(function(player){return player.id === $scope.event.currentPlayerId;}).name;
	};
	$scope.startTimer = function() {
		TimeFactory.startTheTimer();
        startMyTimer();
	}; 
	$scope.startPlayer = function() {
		if ($scope.event.players[0].id === "player1" && $scope.event.currentRound === 1) {
			Events.update(scope.event._id, {$set: {inGame: true}});
			var allEvents = Events.find({}).fetch();
			for(var i in allEvents) {
				if(allEvents[i]._id !== $scope.event._id){
					Events.update(allEvents[i]._id, {$set: {inGame: false}});
				}
			}
			
		}
		getTotalScore();
		$scope.startTimer();
		$scope.startButton = false;
		$scope.stopButton = true;
	};
	$scope.endPlayer = function() {
		TimeFactory.cancelTheTimer();
		$scope.roundTime = 0;
		getTotalScore();
		TimeFactory.setCurrentTime($scope.roundTime);
		Events.update($scope.event._id, {$set: {currentTime: TimeFactory.getCurrentTime() }});
		$scope.stopButton = false;
	};
	$scope.nextPlayer = function() {
		index++;
		$scope.event.currentPlayerId = $scope.event.players[index].id;
		$scope.roundTime = $scope.event.timeLimit;
		getTotalScore();
		TimeFactory.setCurrentTime($scope.roundTime);
		Events.update($scope.event._id, {$set: {currentTime: TimeFactory.getCurrentTime() }});
		Events.update($scope.event._id, {$set: {currentPlayerId: scope.event.currentPlayerId }});
		$scope.updateScores();
		if(index + 1 === $scope.event.players.length) {
			if( $scope.event.currentRound === $scope.event.rounds) {
				$scope.nextRoundButton = false;
				$scope.nextPlayerButton = false;
			}
			else {
				$scope.nextPlayerButton = false;
				$scope.nextRoundButton = true;
				$scope.startButton = true;
			}
		}
		else {
			$scope.startButton = true;
		}
	};
	$scope.nextRound = function() {
		$scope.event.currentRound++;
		Events.update(scope.event._id, {$set: {currentRound: scope.event.currentRound }});
		$scope.roundTime = $scope.event.timeLimit;
		TimeFactory.setCurrentTime($scope.roundTime);
		Events.update($scope.event._id, {$set: {currentTime: TimeFactory.getCurrentTime() }});
		$scope.event.currentPlayerId = $scope.event.players[0].id;
		getTotalScore();
		Events.update(scope.event._id, {$set: {currentPlayerId: scope.event.currentPlayerId }});
		$scope.updateScores();
		index=0;
		if(index + 1 === $scope.event.players.length && $scope.event.currentRound === $scope.event.rounds) {
			$scope.nextRoundButton = false;
			$scope.nextPlayerButton = false;
		}
		else {
			$scope.startButton = true;
			$scope.nextPlayerButton = true;
			$scope.nextRoundButton = false;
		}
	};
	$scope.endGame = function() {
		Events.update(scope.event._id, {$set: {inGame: false }});
	};
});