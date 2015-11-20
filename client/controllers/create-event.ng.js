angular.module('judging-system').controller('CreateEventCtrl', function ($scope, $meteor) {
	var initializeObjects = function() {
		$scope.event = {
			name: '',
			timeLimitMin: 2,
			timeLimitSec: 00,
			rounds: 1
		}; 
		$scope.players = [{
			id: 'player 1',
			name: '',
			team: ''
		}],
		$scope.judges = [{
			id: 'judge 1',
			name: '',
			category: ''
		}];
	}
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
	}
});