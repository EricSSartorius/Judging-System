angular.module('judging-system').controller('AdminConsoleCtrl', function ($rootScope, $scope, $interval, $meteor, TimeFactory) {
	var index;

	var emptyEvent = {
		_id: "empty",
		name: "No events created",
		roundTime: 0,
		currentRound: "--",
		inGame: false
	};

	function getTotalScore() {
		var playerScores = $scope.$meteorCollection(function() {
			return Scores.find({eventId:$scope.event._id, playerId: $scope.event.currentPlayerId});
		});
		$scope.totalScore = 0;
		for(var i=0; i<playerScores.length; i++) {
			$scope.totalScore += playerScores[i].score;
		}
		var tempPlayers = $scope.event.players;
		for(var i=0; i<tempPlayers.length; i++) {
			if(tempPlayers[i].id===$scope.event.currentPlayerId){
				tempPlayers[i].totalScore = $scope.totalScore;
			}
		}
		Events.update($scope.event._id ,{$set:{players: tempPlayers}});
	};
	
	//Initialize variables in a function so that info is not reset on view change
	initializeVar();

	function startMyTimer() {
		theTimer = $interval(timerCallback,1000,0);
		function timerCallback() {
			$scope.roundTime = TimeFactory.getCurrentTime();
	    	Events.update($scope.event._id, {$set: {currentTime: TimeFactory.getCurrentTime() }});
	        if ($scope.roundTime <= 0) {
	        	$scope.stopButton = false;
	        	TimeFactory.cancelTheTimer();
		        $interval.cancel(theTimer);
		        $scope.roundTime = 0;
		    }
		}  
	};

	function setupMyEvents(eventId) {
		$scope.myEvents = Events.find({author:Accounts.userId()}).fetch();
		if($scope.myEvents.length > 0) {	
			var eventFound = false;
		 	for(var i=0; i<$scope.myEvents.length; i++){
			    if($scope.myEvents[i].inGame){
			      eventFound = true;      
			      $scope.event = $scope.myEvents[i];
			      $scope.myEvents = [$scope.event];
			    }
		  	}
			if(!eventFound){
				$scope.event = eventId === undefined ? $scope.myEvents[0] : Events.findOne({_id: eventId});
			}
		}
	};

	function initializeVar(eventId) {
		window.scope = $scope;
		$scope.endButton = true;
		$scope.viewResultsButton = false;
		$scope.events = Events.find({}, {sort: {createdAt: -1}}).fetch();
		console.log(Accounts.userId());
		setupMyEvents(eventId);
		if($scope.event === undefined) {
			$scope.event = emptyEvent;
			$scope.endButton = false;
			$scope.viewResultsButton = false;
		}
		$scope.scores = $scope.$meteorCollection(function() {
	        if(($scope.event !== null) && ($scope.event !== undefined)) {
		        return Scores.find({eventId:$scope.event._id, playerId: $scope.event.currentPlayerId, round: $scope.event.currentRound});
		        $scope.getJudge();
		    }
		    else {
		    	return Scores.find({eventId:"none"});
		    }
		});
		if (!$scope.event.inGame && $scope.event._id !== "empty") {
			index = 0;
			$scope.totalScore = 0;
		  	$scope.roundTime = $scope.event.timeLimit;
		  	TimeFactory.setCurrentTime($scope.event.timeLimit);
		  	$scope.startButton = true;
		  	$scope.stopButton = false;
		  	if($scope.event.players.length === 1) {
		  		$scope.nextPlayerButton = false;
				$scope.nextRoundButton = $scope.rounds > 1 ? true : false;
		  	}
		  	else {
		  		$scope.nextPlayerButton = true;
		  		$scope.nextRoundButton = false;
		  	}
		  	$scope.event.currentPlayerId = $scope.event.players[0].id;
		  	$scope.event.currentRound = 1;
		  	Events.update($scope.event._id, {$set: {currentPlayerId: $scope.event.currentPlayerId }});
		  	Events.update($scope.event._id, {$set: {currentRound: $scope.event.currentRound }});
		}
		else if($scope.event.inGame) {
			getTotalScore();
			for(var i in $scope.event.players) {
				if($scope.event.players[i].id === $scope.event.currentPlayerId){ index = Number(i) };
			}
			$scope.roundTime = TimeFactory.getCurrentTime();
			if($scope.roundTime===$scope.event.timeLimit && !eventId) {
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
			else if((index + 1) === $scope.event.players.length) {
				$scope.nextRoundButton = true;
				$scope.nextPlayerButton=false;
			}
			else {
				$scope.nextPlayerButton = true;
				$scope.nextRoundButton = false;
			}
			startMyTimer();
		}
		else{
			$scope.roundTime = 0;
		} 
	};

	//Refresh admin console when new event is seleted
	$scope.updateEventDetails = function(myEventId) {
		var allEvents = Events.find({author:Accounts.userId()}).fetch();
		for(var i in allEvents) {
			if(allEvents[i]._id !== $scope.event._id) {
				Events.update(allEvents[i]._id, {$set: {inGame: false}});
			}
		}
		initializeVar(myEventId);
	};

	$scope.updateScores = function() {
		$scope.scores = $scope.$meteorCollection(function() {
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

	$scope.getPlayerName = function() {
		if($scope.event._id === "empty" ) return $scope.event.name;
		return $scope.event.players.find(function(player){return player.id === $scope.event.currentPlayerId;}).name;
	};

	$scope.startTimer = function() {
		TimeFactory.startTheTimer();
        startMyTimer();
	}; 

	$scope.startPlayer = function() {
		if ($scope.event.players[0].id === "player1" && $scope.event.currentRound === 1) {
			if($scope.event.players.length === 1) {
				$scope.nextPlayerButton = false;
				$scope.nextRoundButton = $scope.rounds > 1 ? true : false;
			}
			Events.update(scope.event._id, {$set: {inGame: true}});
			$rootScope.recentEvent = $scope.event._id;
			setupMyEvents();
			var allEvents = Events.find({author:Accounts.userId()}).fetch();
			for(var i in allEvents) {
				if(allEvents[i]._id !== $scope.event._id) {
					Events.update(allEvents[i]._id, {$set: {inGame: false}});
				}
			}
		}
		getTotalScore();
		$scope.startTimer();
	};

	$scope.endPlayer = function() {
		TimeFactory.cancelTheTimer();
		$scope.roundTime = 0;
		getTotalScore();
		TimeFactory.setCurrentTime($scope.roundTime);
		Events.update($scope.event._id, {$set: {currentTime: TimeFactory.getCurrentTime()}});
		$scope.stopButton = false;
	};

	$scope.nextPlayer = function() {
		index++;
		if(!$scope.event.inGame) {
			Events.update(scope.event._id, {$set: {inGame: true}});
		}
		TimeFactory.cancelTheTimer();
		$scope.event.currentPlayerId = $scope.event.players[index].id;
		$scope.roundTime = $scope.event.timeLimit;
		getTotalScore();
		TimeFactory.setCurrentTime($scope.roundTime);
		Events.update($scope.event._id, {$set: {currentTime: TimeFactory.getCurrentTime() }});
		Events.update($scope.event._id, {$set: {currentPlayerId: scope.event.currentPlayerId }});
		$scope.updateScores();
		if($scope.stopButton) {
			$scope.stopButton = false;
		}
		if(index + 1 === $scope.event.players.length) {
			if( $scope.event.currentRound === $scope.event.rounds) {
				$scope.nextRoundButton = false;
				$scope.nextPlayerButton = false;
				$scope.startButton = false;
			}
			else {
				$scope.nextPlayerButton = false;
				$scope.nextRoundButton = true;
				$scope.startButton = true;
				index = 0;
			}
		}
		else {
			$scope.startButton = true;
		}
	};

	$scope.nextRound = function() {
		$scope.event.currentRound++;
		TimeFactory.cancelTheTimer();
		Events.update(scope.event._id, {$set: {currentRound: scope.event.currentRound }});
		$scope.roundTime = $scope.event.timeLimit;
		TimeFactory.setCurrentTime($scope.roundTime);
		Events.update($scope.event._id, {$set: {currentTime: TimeFactory.getCurrentTime() }});
		$scope.event.currentPlayerId = $scope.event.players[0].id;
		getTotalScore();
		Events.update(scope.event._id, {$set: {currentPlayerId: scope.event.currentPlayerId }});
		$scope.updateScores();
		if($scope.stopButton) {
			$scope.stopButton = false;
		}
		if($scope.event.players.length === 1 && $scope.event.currentRound === $scope.event.rounds) {
			$scope.startButton = true;
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
		TimeFactory.cancelTheTimer();
		$scope.roundTime = 0;
		TimeFactory.setCurrentTime($scope.roundTime);
		getTotalScore();
		Events.update(scope.event._id, {$set: {inGame: false }});
		setupMyEvents();
		$scope.nextRoundButton = false;
		$scope.nextPlayerButton = false;
		$scope.startButton = false;
		$scope.stopButton = false;
		$scope.endButton = false;
		$scope.viewResultsButton = true;
	};
});