angular.module('judging-system').controller('JudgingConsoleCtrl', function ($scope, $meteor) {
	$scope.score = 0;
	events = Events.find({inGame:true}).fetch();
	$scope.event = events.find(function(e){ 
		for(var i = 0; i< e.judges.length; i++){
			var judge = e.judges[i];
			var user = Meteor.users.findOne({_id:Meteor.userId()});
		  	if (user.emails.map(function(email){return email.address;}).indexOf(judge.email) !== -1){
		  		$scope.judge = judge;
		  		return true;
		  	}
		}
	});
	$scope.showTime = function() {
		if ($scope.event === undefined) {
			return 0;
		}
		else {
			return $scope.event.timeLimit;
		}
	};
	$scope.submitScore = function() {
		Scores.insert({score: $scope.score, judgeId: $scope.judge.id, playerId: $scope.event.currentPlayerId, eventId: $scope.event._id}, function(err, id){
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