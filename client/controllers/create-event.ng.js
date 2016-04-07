angular.module('judging-system').controller('CreateEventCtrl', function ($scope, $q, $meteor, $state) {
	$scope.noOfJudges = 7;
	$scope.noOfPlayers = 100;

	var initializeObjects = function(createdName) {

		//Information from Event schema to be put into the form
		$scope.event = {
			name: '',
			timeLimitMin: 2,
			timeLimitSec: 00,
			rounds: 1,
      		players: [],
      		judges: [],
      		scores: []
		};
		$scope.players = [{
			id: 'player1',
			name: ''
		}];
		$scope.judges = [{
			id: 'judge1',
			name: '',
			category: ''
		}];
		$scope.errorMsg = "";
	};
	initializeObjects();

	//Adds a new player everytime a new player section is created on form
	$scope.addPlayer = function() {
		var newPlayerNo = $scope.players.length+1;
		$scope.players.push({'id':'player'+newPlayerNo});
	};

	//Adds a new judge everytime a new judge section is created on form
	$scope.addJudge = function() {
		var newJudgeNo = $scope.judges.length+1;
		$scope.judges.push({'id':'judge'+newJudgeNo});
	};

	$scope.doesUserEmailExist = function(judge){
		judge.trueJudge = true;
    var exist = Meteor.call('checkUserByEmail', judge.email , function(err, res){
				if(err){
						console.log(err + ' ' + judge.email , 'does not exist!');
						Session.set(judge.email, false);
				}
        if(res){
            console.log(res + ' ' + judge.email  + ' exists as a registered email!');
            Session.set(judge.email, res);
        }
				return Session.get(judge.email)
    })
		exist;
		console.log('Session is ' + Session.get(judge.email));
  }
	//if judge is true this returns true
	//else it returns false
	//based on the Session value from
	//doesUserEmailExist
	$scope.isJudgeValid = function(judge){
		if (Session.get(judge.email) === true){
			return true;
		}else{
			return false;
		}
	}

	$scope.removePerson = function(array, index) {
	    array.splice(index, 1);
	};

	$scope.createEvent = function() {
		var timeLimit = parseInt($scope.event.timeLimitMin, 10) * 60 + parseInt($scope.event.timeLimitSec, 10);
		var jEmails = [];
		var hasDuplicateEmail = false;
		var hasUnregisteredEmail = false;
		//check that you have registered users as emails
		for(var b = 0; b < $scope.judges.length; b++){
			var currentJudge = $scope.judges[b].email;
			var doesemailexist = Meteor.users.findOne({'emails.address': currentJudge});

			if(doesemailexist === undefined && currentJudge !== undefined){
				hasUnregisteredEmail = true;
			}

		}
		//Checks that no 2 judges can have the same email address
		for(var i = 0; i < $scope.judges.length; i++){
			if(jEmails.indexOf($scope.judges[i].email) > -1){
				hasDuplicateEmail = true;
			}
			jEmails.push($scope.judges[i].email);
		}
		if(hasDuplicateEmail){
			Bert.alert( "A judge's email address cannot be used more than once.", 'danger', 'fixed-top');
		}
		else if (hasUnregisteredEmail) {
			Bert.alert("You must use emails registered to UJudge!", 'danger', 'fixed-top');
			//Send Email to User indicating to change email to a correct registered user.
			// console.log(Meteor.user().emails[0].address.toString(),"is a typeof ", typeof Meteor.user().emails[0].address.toString())
			Meteor.call(
				'sendEmail',
				Meteor.user().emails[0].address.toString(),
				'iamtheepic@gmail.com',
				'Hello from UJudge!',
				'You tried to create an event with an unregistered email. Use registerd users for Judges.'
			);
		}
		else {
			$scope.errorMsg = "";
			$scope.event.timeLimit = timeLimit;
		    $scope.event.players = $scope.players;
		    $scope.event.judges = $scope.judges;
			Events.insert($scope.event, function(err, id){
				if (err) {
					Bert.alert("" + err, 'danger', 'fixed-top');
					console.log(err);
				}
				else {
					$scope.$apply(function(){
						if (id) {
							$state.go('adminConsole');
							Bert.alert('Event created sucessfully.', 'success', 'growl-top-right');
						}
					});
				}
			});
		}
	};
});
