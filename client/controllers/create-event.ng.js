angular.module('judging-system').controller('CreateEventCtrl', function ($scope, $meteor) {
	var initializeObjects = function() {
		$scope.event = {
			name: '',
			timeLimitMin: '',
			timeLimitSec: '',
			rounds: 1
		}; 
		$scope.players = [{
			name: '',
			team: ''
		}];
		$scope.judge = {
			name: '',
			category: ''
		};
	}
	initializeObjects();

	var addPlayer = function() {
		$scope.players.push(player.name);
	};
	var deletePlayer = function() {
		$scope.players.pop(player.name);
	}

	$scope.createEvent = function() {
		var timeLimit = parseInt($scope.event.timeLimitMin, 10) * 60 + parseInt($scope.event.timeLimitSec, 10);
		$scope.event.timeLimit = timeLimit;
		Events.insert($scope.event, function(err, id){
			if (err) {
				console.log(err);
			} else {
				$scope.$apply(function(){
					if (id) {
						initializeObjects();
					}
				});
			}
			
		});
	}

	$scope.rounds = [
	1,
	2,
	3,
	];
});