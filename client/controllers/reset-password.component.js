angular.module("judging-system").directive('resetpw', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/components/reset-password.ng.html',
    controllerAs: 'resetpw',
    controller: function ($scope, $state) {

      $scope.error = '';

      $scope.forgot = {}; //forgot email object

      $scope.forgot.email = '';

      $scope.resetPassword = () => {
        Accounts.forgotPassword($scope.forgot, (err) => {
          if (err) {
            Bert.alert("" + err, 'danger', 'fixed-top');
          }else{
            alert('Check your mailbox!')
          }
        });
      };
    }
  }
});
