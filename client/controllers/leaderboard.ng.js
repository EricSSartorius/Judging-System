angular.module('judging-system').controller('LeaderboardCtrl', function ($scope, $meteor) {
	$scope.event = Events.findOne({inGame:true});


	if($scope.event !== undefined){
	$scope.eventplayers = Events.findOne({inGame:true}).players;

	var contestants = $scope.eventplayers;

	$scope.tied = contestants.map(function(player){
		var output = {}
		output.name = player.name
		output.score = player.totalScore
		return output
	}).sort(function(a,b){
		return parseFloat(a.score) - parseFloat(b.score)
	}).reverse()

	var checkforTie = $scope.tied.slice(); //[{"name":"iron man","score":7},{"name":"cap america","score":3},{"name":"hulk","score":7}]

	var weHaveATie = function(array){
	  var start = 0;
	  var tiedplayers = [];
	  //loop through array to see equal scores
	  for(var i = 0; i < array.length; i++){
	    if(array[start].score === array[i].score){
	      //if scores are equal to checkforTie[0] push to tiedplayers
	      tiedplayers.push(array[i]);
	    }
	  }
	  if(tiedplayers.length > 1){
	    console.log("weHaveATie, says 'There is a tie!'", tiedplayers);
	    return tiedplayers
	  }
	  else{
	    console.log("weHaveATie, says 'False, There's no tie'")
	    return false
	  }
	};

	$scope.dowehaveTie = weHaveATie(checkforTie);
}//end if $scope.event !== undefined

	//check to see if there is an event game
	$scope.nogame = Events.findOne({inGame:true}) === undefined ? "No Game" : "Game on";

	window.scope=$scope;
	if ($scope.event) {
		$scope.title = "Rank   Name   Points";

		$scope.events = $scope.$meteorCollection(function(){
			return Events.find({inGame:true});
		});
	}
	else {
		$scope.noEvent = "No event currently running";
	}
});
