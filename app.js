if (Meteor.isClient) {
 
  angular.module('judging-system',['angular-meteor']);
 
  angular.module('judging-system').controller('JudgingSystemCtrl', ['$scope',
    function ($scope) {
 	$scope.title = "blah";
//
 
  }]);
}