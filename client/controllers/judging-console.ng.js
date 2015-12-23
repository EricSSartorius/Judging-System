angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor, TimeFactory) {
	$scope.score = 0;
	$scope.disabled = true;
	window.scope = $scope;
	$scope.event = $scope.$meteorCollection(function(){
		return runningEvents = Events.find({inGame: true});
    });
	$scope.showTime = function() {
		if ($scope.event[0] === undefined) {
			return 0;
		}
		else {
			return TimeFactory.getCurrentTime();
		}
	};
	$scope.disableConsole = function() {
		var disabled = $scope.event[0] === undefined ?  true : false;
		return disabled;
	}
	$scope.getPlayerName = function(){
		if ($scope.event[0] === undefined) {
			return "No Current Player";
		}
		else {
			return $scope.event[0].players.find(function(player){return player.id === $scope.event[0].currentPlayerId;}).name;
		}
	};
	$scope.showCurrentRound = function(){
		if ($scope.event[0] === undefined) {
			return "-";
		}
		else {
			return $scope.event[0].currentRound;
		}
	};
	$scope.submitScore = function() {
		for(var i = 0; i < $scope.event[0].judges.length; i++){
			var judge = $scope.event[0].judges[i];
			var user = Meteor.users.findOne({_id:Meteor.userId()});
		  	if (user.emails.map(function(email){return email.address;}).indexOf(judge.email) !== -1){
		  		$scope.judge = judge;
		  		break;
		  	}
		}
	    var existingScore = Scores.findOne({
	        judgeId: $scope.judge.id,
	        playerId: $scope.event[0].currentPlayerId,
	        eventId: $scope.event[0]._id,
	        round: $scope.event[0].currentRound
	    });
	    if (existingScore){
			 Scores.update({_id: existingScore._id}, {$set: {score: $scope.score}});
	    } 
	    else {
			Scores.insert({
		        judgeId: $scope.judge.id,
		        playerId: $scope.event[0].currentPlayerId,
		        eventId: $scope.event[0]._id,
		        round: $scope.event[0].currentRound,
		        score: $scope.score
	    	});
    	}
	}
});
