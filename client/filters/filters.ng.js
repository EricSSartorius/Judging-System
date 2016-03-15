angular.module('judging-system').filter('timeFilter', function() {
	
	//Changes number to time format
    return function(seconds) {
        var timeFormat = new Date(0,0,0,0,0,0,0);
        timeFormat.setSeconds(seconds);
        return timeFormat;
    };
});