angular.module('judging-system').controller('AdminConsoleCtrl', function ($scope, $meteor) {
	$scope.events = Events.find().fetch();
	$scope.event = Events.findOne({_id: "DcjPnjyaeGuRZvrXk"});
	$scope.score = Scores.findOne({_id: "6dMF4Jy54uWsC2HkL"});
	$scope.roundScore = 15;
	$scope.totalScore = 100;
	// $scope.getTotal = function(){
	//     var total = 0;
	//     for(var i = 0; i < $scope.score.score.length; i++){
	//         total += $scope.score.score[i];
	//     }
	//     return total;
	// };
});