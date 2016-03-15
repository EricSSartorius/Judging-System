angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor) {
	$scope.score = 0;
	$scope.events = $scope.$meteorCollection(function(){ //$MeteorCollection depriciated
		return runningEvents = Events.find({inGame: true});
    });

	//Cross checks judge email with all events to see if the judge is currently judging
    $scope.checkForJudge = function() {
		for(var j=0; j < $scope.events.length; j++){
			for(var i = 0; i < $scope.events[j].judges.length; i++){
				var judge = $scope.events[j].judges[i];
				var user = Meteor.users.findOne({_id:Meteor.userId()});
			  	if (user.emails.map(function(email){return email.address;}).indexOf(judge.email) !== -1){
			  		$scope.judge = judge;
			  		$scope.event = $scope.events[j];
			  		break;
			  	}
			}
		}
	};

	//Shows time from Event collection
	$scope.showTime = function() {
		if ($scope.event === undefined) {
			return 0;
		}
		else {
			return $scope.event.currentTime;
		}
	};

	//Disables ability to give score if judge has already given score or the event has not started
	$scope.disableConsole = function() {
		$scope.checkForJudge();
		var disabled = false;
		if($scope.event === undefined) {
			disabled = true;
		}
		else {
			var scoreCollection = Scores.find({eventId:$scope.event._id, judgeId: $scope.judge.id, playerId: $scope.event.currentPlayerId, round: $scope.event.currentRound}).fetch();
		    disabled = scoreCollection.length > 0;
		    if(!disabled){
		    	disabled = $scope.event.currentTime === $scope.event.timeLimit;
		    }
		}
		return disabled;
	}

	//Get the current player name to display
	$scope.getPlayerName = function(){
		if ($scope.event === undefined) {
			return "No Current Player";
		}
		else {
			return $scope.event.players.find(function(player){return player.id === $scope.event.currentPlayerId;}).name;
		}
	};

	//Displays current player's round
	$scope.showCurrentRound = function(){
		if ($scope.event === undefined) {
			return "-";
		}
		else {
			return $scope.event.currentRound;
		}
	};

	//Cross-checks judge, player, event, and round to submit score to Score collection
	$scope.submitScore = function() {
		$scope.submitted = true;
	    var existingScore = Scores.findOne({
	        judgeId: $scope.judge.id,
	        playerId: $scope.event.currentPlayerId,
	        eventId: $scope.event._id,
	        round: $scope.event.currentRound
	    });
	    if (existingScore){
			 Scores.update({_id: existingScore._id}, {$set: {score: $scope.score}});
	    } 
	    else {
			Scores.insert({
		        judgeId: $scope.judge.id,
		        playerId: $scope.event.currentPlayerId,
		        eventId: $scope.event._id,
		        round: $scope.event.currentRound,
		        score: $scope.score
	    	});
    	}
	};
});
