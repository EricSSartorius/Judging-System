angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor) {
	$scope.score = 0;
	debugger
	// events = Events.find({inGame: true}).fetch();
	// $scope.tempEvent = events.find(function(e){ 
	// 	for(var i = 0; i< e.judges.length; i++){
	// 		var judge = e.judges[i];
	// 		var user = Meteor.users.findOne({_id:Meteor.userId()});
	// 	  	if (user.emails.map(function(email){return email.address;}).indexOf(judge.email) !== -1){
	// 	  		$scope.judge = judge;
	// 	  		return true;
	// 	  	}
	// 	}
	// });
	// $scope.disabled = true;
	window.scope = $scope;
	// $scope.runningEvents = $scope.$meteorCollection(function(){
	// 	return Events.find({inGame: true});
	// });

	$scope.event = $scope.$meteorCollection(function(){
		return runningEvents = Events.find({inGame: true});
		
		// var user = Meteor.users.findOne({_id:Meteor.userId()});
		// var email = user.emails.map(function(email){return email.address;});
		
		// return Events.find({inGame: true});
		
		// return $scope.runningEvents.find(function(e){
		
  // //       return events.find(function(e){ 
		// 	for(var i = 0; i< e.judges.length; i++){
		// 		var judge = e.judges[i];
		// 		var user = Meteor.users.findOne({_id:Meteor.userId()});
		// 	  	if (user.emails.map(function(email){return email.address;}).indexOf(judge.email) !== -1){
		// 	  		$scope.judge = judge;
		// 	  		return true;
		// 	  	}
		// 	}
		// });
    });

	// events = Events.find({inGame:true}).fetch();
	// $scope.event = events.find(function(e){ 
	// 	for(var i = 0; i< e.judges.length; i++){
	// 		var judge = e.judges[i];
	// 		var user = Meteor.users.findOne({_id:Meteor.userId()});
	// 	  	if (user.emails.map(function(email){return email.address;}).indexOf(judge.email) !== -1){
	// 	  		$scope.judge = judge;
	// 	  		return true;
	// 	  	}
	// 	}
	// });
	$scope.showTime = function() {
		if ($scope.event[0] === undefined) {
			return 0;
		}
		else {
			//return $scope.event.find(function(e){return true;}).currentTime;
			return $scope.event[0].currentTime;
		}
	};

	$scope.showCurrentPlayerId = function(){
		if ($scope.event[0] === undefined) {
			return 0;
		}
		else {
			return $scope.event[0].currentPlayerId;
		}
	};

	$scope.showCurrentRound = function(){
		if ($scope.event[0] === undefined) {
			return 0;
		}
		else {
			return $scope.event[0].currentRound;
		}
	};
	// $scope.disableScoring = function() {
	// 	$scope.disabled = ($scope.event.inGame === true) ? true : false;
	// };
	$scope.submitScore = function() {
		for(var i = 0; i < $scope.event[0].judges.length; i++){
			var judge = $scope.event[0].judges[i];
			var user = Meteor.users.findOne({_id:Meteor.userId()});
		  	if (user.emails.map(function(email){return email.address;}).indexOf(judge.email) !== -1){
		  		$scope.judge = judge;
		  		break;
		  	}
		}

		// Scores.update({
		// 	judgeId: $scope.judge.id,
		// 	playerId: $scope.event[0].currentPlayerId,
		// 	eventId: $scope.event[0]._id,
		// 	round: $scope.event[0].currentRound
		// },
		// {$set: {
		// 	score: $scope.score,
		// 	judgeId: $scope.judge.id,
		// 	playerId: $scope.event[0].currentPlayerId,
		// 	eventId: $scope.event[0]._id,
		// 	round: $scope.event[0].currentRound
		// }}, 
		// {upsert:true
  //  		});

		Scores.insert({
			score: $scope.score,
			judgeId: $scope.judge.id,
			playerId: $scope.event[0].currentPlayerId,
			eventId: $scope.event[0]._id,
			round: $scope.event[0].currentRound
		},
		function(err, id){
			if (err) {
				console.log(err);
			} 
			else {
				$scope.$apply(function(){
					if (id) {
						return $scope.score;	
					}
				});
			}
		});
	}
});