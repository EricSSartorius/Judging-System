angular.module('judging-system').directive('myButton', ['MY_EVENTS', "$interval", function(MY_EVENTS, $interval) {
    return {
        templateUrl: 'client/lib/templates/my-button.ng.html',
        restrict: 'E',
        replace: true,
        scope: { },
        link: function(scope, element, attributes) {
        	scope.event = Events.findOne({_id: "DcjPnjyaeGuRZvrXk"});
        	scope.roundTime = MY_EVENTS.roundLength;
        	scope.roundCounter = 1;
    		scope.startButton = "START ROUND";
    		var theTimer;
			scope.handleButtonClick= function() {
	        	switch (scope.startButton) {
	        		case "START ROUND":
	        			Events.update(scope.event._id, {$set: {inGame: true }});
						scope.event = Events.findOne({_id: scope.event._id});
	        			scope.startButton = "END ROUND";
						scope.startTimer();
						break;
				    case "NEXT ROUND":
				        scope.roundTime = MY_EVENTS.roundLength;
				        scope.roundCounter++;
						scope.startButton = "START ROUND";
				        break;
				    case "NEXT PLAYER": 
				    	Events.update(scope.event._id, {$set: {inGame: false }});
				    	scope.event = Events.findOne({_id: scope.event._id});
				        //GO TO NEXT PLAYER IN DATABASE
						//RESET EVERYTHING
						console.log("Go to the next player");
				        break;
				    case "END GAME":
				    	Events.update(scope.event._id, {$set: {inGame: false }});
						scope.event = Events.findOne({_id: scope.event._id});
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
    			console.log("rounds finished: " + scope.roundCounter);
    			if (scope.roundCounter === MY_EVENTS.nofOfRounds) {
    				scope.roundCounter = 1;
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