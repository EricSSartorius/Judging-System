angular.module("judging-system").directive('resetpw', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/components/reset-password.ng.html',
    controllerAs: 'resetpw',
    controller: function ($scope, $state) {
 
      $scope.credentials = {
        email: ''
      };
 
      $scope.error = '';
 
      $scope.reset = () => {
        Accounts.forgotPassword($scope.credentials, (err) => {
          if (err) {
            $scope.error = err;
          }
        });
      };
    }
  }
});