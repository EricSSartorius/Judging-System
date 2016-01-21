angular.module('judging-system').factory('TimeFactory', function($interval) {
    var currentTime = 0;
    var theTimer = 0;
    var timerStarted = false;
    return  {
    	getCurrentTime: function() {
    		return currentTime;
        },
        setCurrentTime: function(time) {
        	currentTime = time;
        },
        startTheTimer: function() {
        	if(!timerStarted){
	        	timerStarted=true;
	        	theTimer = $interval(function(){	
		        	if (currentTime >= 0)
		        		currentTime--;
		        	else{
		        		timerStarted=false;
		        		$interval.cancel(theTimer);
		        	}
		    	},1000,0); 
    		}
        },
        cancelTheTimer: function() {
        	$interval.cancel(theTimer);
        	timerStarted = false;
        },
        resetTheTimer: function(time) {
            $interval.cancel(theTimer);
            timerStarted = false;
            currentTime = time;
        }
    };
});


// angular.module('judging-system').factory('AlertFactory', function() {
//     var alert = false;
//     return  {
//     	alertAdmin: function() {
//         	alert = (!alert) ? true : false;
//         	return alert;
//         }
//     };
// });