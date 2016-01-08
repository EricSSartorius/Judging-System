angular.module('judging-system').controller('QuickScoreboardCtrl', function ($scope, $meteor, $interval, TimeFactory) {
	$scope.leftScore = 0;
	$scope.rightScore = 0;
	$scope.quickTimer = 300;
	TimeFactory.setCurrentTime($scope.quickTimer);

	$scope.timerUp = function() {
			if($scope.quickTimer>=3540){
				$scope.quickTimer = -60;
			}
			$scope.quickTimer+=60;
			TimeFactory.setCurrentTime($scope.quickTimer);
	};
	$scope.timerDown = function() {
			if($scope.quickTimer<=0){
				$scope.quickTimer = 3600;
			}
			$scope.quickTimer-=60;
			TimeFactory.setCurrentTime($scope.quickTimer);
	};
	$scope.startTimer = function() {
		TimeFactory.startTheTimer();
		var theTimer = $interval(function(){
	        	$scope.quickTimer = TimeFactory.getCurrentTime();
		        if ($scope.quickTimer <= 0) {
		        	TimeFactory.cancelTheTimer();
			        $interval.cancel(theTimer);
			        $scope.quickTimer = 0;
			    }
		    },1000,0);  
	};
	$scope.pauseTimer = function() {
		TimeFactory.cancelTheTimer();
	};
	$scope.stopTimer = function() {
		TimeFactory.resetTheTimer(0);
	};
	$scope.leftScoreUp = function() {
		if($scope.leftScore < 100)
			$scope.leftScore++;
	};
	$scope.leftScoreDown = function() {
		if($scope.leftScore > 0)
			$scope.leftScore--;
	};
	$scope.rightScoreUp = function() {
		if($scope.rightScore < 100)
			$scope.rightScore++;
	};
	$scope.rightScoreDown = function() {
		if($scope.rightScore > 0)
			$scope.rightScore--;
	};
});