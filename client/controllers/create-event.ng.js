angular.module('judging-system').controller('CreateEventCtrl', function ($scope, $meteor) {
	$scope.noOfJudges = 7;
	$scope.noOfPlayers = 100;
	var initializeObjects = function() {
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
		// $scope.scores = [];
		// {
		// 	id: 'score1',
		// 	score: null,
		// 	judgeId: '',
		// 	playerId: '',
		// 	roundNum: null
		// }];
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
	$scope.removePerson = function(array, index){
	    array.splice(index, 1);
	};

	$scope.createEvent = function() {
		var timeLimit = parseInt($scope.event.timeLimitMin, 10) * 60 + parseInt($scope.event.timeLimitSec, 10);
		$scope.event.timeLimit = timeLimit;
	    $scope.event.players = $scope.players;
	    $scope.event.judges = $scope.judges;
	    // $scope.event.scores = $scope.scores;
	    //Make an array of scores based on players and judges
	    //Use 3 for loops (judge, player, round) to populate fields
	    // var newScoreNo = 1;
	    // for (var judge in $scope.event.judges) {
	    // 	for (var player in $scope.event.players) {
	    // 		for (var i = 1; i <= $scope.event.rounds; i++) {
	    // 			$scope.scores.push({'id': 'score'+newScoreNo, 'judgeId': judge.id, 'playerId': player.id, 'roundNum': i, 'score': 0});
	    // 			newScoreNo++;
	    // 		};
	    // 	}
	    // };
	    // debugger
	    // for (var i = 0; i < $scope.event.judges.length; i++) {
	    // 	for (var j = 0; j < $scope.event.players.length; j++) {
	    // 		for (var k = 1; k <= $scope.event.rounds; k++) {
	    // 			$scope.scores.push({'id': 'score'+newScoreNo, 'judgeId': $scope.event.judges[i].id, 'playerId': $scope.event.players[j].id, 'roundNum': k, 'score': 0});
	    // 			newScoreNo++;
	    // 		};
	    // 	}
	    // };
		Events.insert($scope.event, function(err, id){
			if (err) {
				console.log(err);
			} 
			else {
				$scope.$apply(function(){
					if (id) {
						initializeObjects();
					}
				});
			}
		});
	};

	var formatNumbers = function(){
		if ((this.value + '').length < 2) this.value = "0" + this.value;
	};
	$(document).ready(function(){
		$('input[type=number]').keyup(formatNumbers);
		$('input[type=number]').click(formatNumbers);
		$('input[type=number]').keyup();
	});
});
