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





// angular.module('judging-system').directive('alertDirective', function() {

//      return {
//          template: '<div>'+'<i  ng-click="alertAdmin()" ng-show="alert" class="fa fa-dot-circle-o">'+'</i>'+'<i  ng-click="alertAdmin()" ng-hide="alert" class="fa fa-circle-o">'+'</i>'+'</div>',
//          restrict: 'E',
//          replace: true,
//          scope: {},
//          link: function(scope, element, attributes) {
//         	scope.alert = false;
        	
//         	scope.alertAdmin = function() {
// 	        	scope.alert = (!scope.alert) ? true : false;
// 	        	return scope.alert;
// 	        }
//     	}
//     }
//  });