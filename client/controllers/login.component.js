angular.module("judging-system").directive('login', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/components/login.ng.html',
    controllerAs: 'login',
    controller: function ($scope, $state) {
 
      $scope.credentials = {
        email: '',
        password: ''
      };
 
      $scope.error = '';
      
      $scope.login = () => {
        Meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password, (err) => {
          if (err) {
            $scope.error = err;
            console.log(err);
          }
        });
      };
    }
  }
});