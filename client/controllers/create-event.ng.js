angular.module('judging-system').controller('CreateEventCtrl', function ($scope, $meteor, $state) {
	$scope.noOfJudges = 7;
	$scope.noOfPlayers = 100;

	var initializeObjects = function(createdName) {
		$scope.event = {
			name: '',
			timeLimitMin: 2,
			timeLimitSec: 00,
			rounds: 1,
      		players: [],
      		judges: [],
      		scores: []
		}; 
		$scope.players = [{
			id: 'player1',
			name: ''
		}];
		$scope.judges = [{
			id: 'judge1',
			name: '',
			category: ''
		}];
		$scope.errorMsg = "";
	};
	initializeObjects();

	$scope.addPlayer = function() {
		var newPlayerNo = $scope.players.length+1;
		$scope.players.push({'id':'player'+newPlayerNo});
	};

	$scope.addJudge = function() {
		var newJudgeNo = $scope.judges.length+1;
		$scope.judges.push({'id':'judge'+newJudgeNo});
	};

	$scope.removePerson = function(array, index) {
	    array.splice(index, 1);
	};

	$scope.createEvent = function() {
		var timeLimit = parseInt($scope.event.timeLimitMin, 10) * 60 + parseInt($scope.event.timeLimitSec, 10);
		var jEmails = [];
		var hasDuplicateEmail = false;
		for(var i = 0; i < $scope.judges.length; i++){
			if(jEmails.indexOf($scope.judges[i].email) > -1){
				hasDuplicateEmail = true;
			}
			jEmails.push($scope.judges[i].email);
		}
		if(hasDuplicateEmail){
			$scope.errorMsg = "A judge's email address cannot be used more than once.";
		}
		else {
			$scope.errorMsg = "";
			$scope.event.timeLimit = timeLimit;
		    $scope.event.players = $scope.players;
		    $scope.event.judges = $scope.judges;
			Events.insert($scope.event, function(err, id){
				if (err) {
					console.log(err);
				} 
				else {
					$scope.$apply(function(){
						if (id) {
							$state.go('adminConsole');
						}
					});
				}
			});
		}
	};
});
