angular.module("judging-system").directive('resetpw', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/auth/reset-password/reset-password.ng.html',
    controllerAs: 'resetpw',
    controller: function ($scope, $state) {
      // $reactive(this).attach($scope);
 
      $scope.credentials = {
        email: ''
      };
 
      $scope.error = '';
 
      $scope.reset = () => {
        Accounts.forgotPassword($scope.credentials, (err) => {
          if (err) {
            $scope.error = err;
          }
          // else {
          //   $state.go('home');
          // }
        });
      };
    }
  }
});