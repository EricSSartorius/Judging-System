angular.module('judging-system').controller('QuickScoreboardCtrl', function ($scope, $meteor, $interval, TimeFactory) {
	$scope.leftScore = 0;
	$scope.rightScore = 0;
	$scope.quickTimer = 300;
	$scope.start = true;
	$scope.end = false;
	$scope.startTime = $scope.quickTimer;
	TimeFactory.setCurrentTime($scope.quickTimer);

	//Add time to the timer in 1 minute increments
	$scope.timerUp = function() {
			if($scope.quickTimer>=3540){
				$scope.quickTimer = -60;
			}
			$scope.quickTimer+=60;
			TimeFactory.setCurrentTime($scope.quickTimer);
	};

	//Subtract time from the timer in 1 minute increments
	$scope.timerDown = function() {
			if($scope.quickTimer<=0){
				$scope.quickTimer = 3600;
			}
			$scope.quickTimer-=60;
			TimeFactory.setCurrentTime($scope.quickTimer);
	};

	//Starts the timer via timer service
	$scope.startTimer = function() {
		if($scope.quickTimer !== 0){
			$scope.start = false;
			$scope.end = true;
		}
		$scope.startTime = $scope.quickTimer;
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

	//Pause the timer
	$scope.pauseTimer = function() {
		$scope.start = true;
		TimeFactory.cancelTheTimer();
	};

	//End the timer
	$scope.endTimer = function() {
		$scope.start = true;
		$scope.end = false;
		TimeFactory.resetTheTimer(0);
		$scope.quickTimer = 0;
		$scope.startTime = $scope.quickTimer;
	};

	//Reset the timer
	$scope.resetTimer = function() {
		$scope.quickTimer = $scope.startTime;
		TimeFactory.resetTheTimer($scope.quickTimer)
		$scope.leftScore = 0;
		$scope.rightScore = 0;
		$scope.start = true;
		$scope.end = false;
	}

	//Increase score for left side
	$scope.leftScoreUp = function() {
		if($scope.leftScore < 100)
			$scope.leftScore++;
	};

	//Decrease score for left side
	$scope.leftScoreDown = function() {
		if($scope.leftScore > 0)
			$scope.leftScore--;
	};

	//Increase score for right side
	$scope.rightScoreUp = function() {
		if($scope.rightScore < 100)
			$scope.rightScore++;
	};
	
	//Decrease score for right side
	$scope.rightScoreDown = function() {
		if($scope.rightScore > 0)
			$scope.rightScore--;
	};
});