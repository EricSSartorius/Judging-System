angular.module('judging-system', ['angular-meteor', 'ui.router', 'ngMaterial']); 

angular.module('judging-system').filter('timeFilter', function() {
    return function(seconds) {
        var timeFormat = new Date(0,0,0,0,0,0,0);
        timeFormat.setSeconds(seconds);
        return timeFormat;
    };
});

angular.module('judging-system').directive('myButton', ['MY_EVENTS', "$interval", function(MY_EVENTS, $interval) {
    return {
        template: '<div><h1>{{ roundTime | timeFilter | date:"mm:ss"}}</h1><button ng-click="handleButtonClick()">{{startButton}}</button></div>',
        restrict: 'E',
        replace: true,
        scope: { },
        link: function(scope, element, attributes) {
        	scope.roundTime = MY_EVENTS.roundLength;
        	scope.roundCounter = 0;
    		scope.startButton = "START ROUND";
    		var theTimer;
			scope.handleButtonClick= function() {
	        	switch (scope.startButton) {
	        		case "START ROUND":
	        			scope.startButton = "END ROUND";
						scope.startTimer();
						break;
				    case "NEXT ROUND":
				        scope.roundTime = MY_EVENTS.roundLength;
						scope.startButton = "START ROUND";
				        break;
				    case "NEXT PLAYER": 
				        //GO TO NEXT PLAYER IN DATABASE
						//RESET EVERYTHING
						console.log("Go to the next player");
				        break;
				    case "END GAME":
				         // //GO TO RESULT SCREEN
						console.log("Game Over");
				        break;
				    default:
				        $interval.cancel(theTimer);
					    scope.roundTime = 0;
					    scope.determineRound();
				        break;
				}
			};
    		scope.determineRound = function() {
    			scope.roundCounter++;
    			console.log("rounds finished: " + scope.roundCounter);
    			if (scope.roundCounter === MY_EVENTS.nofOfRounds) {
    				scope.roundCounter = 0;
    				// if (NO MORE PLAYERS) {
    				// scope.startButton = "END GAME";
    				// }
    				// else {
    					scope.startButton = "NEXT PLAYER";
    					//CHANGE PLAYERS IN DATABASE
    					//RESET EVERYTHING
    				// }
    			}
    			else {
		        	scope.startButton = "NEXT ROUND";
		        }
    		};
    		scope.startTimer = function() {
		        theTimer = $interval(function(){	
			        scope.roundTime--;
			        if (scope.roundTime <0) {
				        $interval.cancel(theTimer);
				        scope.roundTime = 0;
				        scope.determineRound();
				    }
			    },1000,0);  
    		}; 
    	}
    }
 }]);
angular.module('judging-system').constant("MY_EVENTS", {
	roundLength: 5,
	nofOfRounds: 4
});