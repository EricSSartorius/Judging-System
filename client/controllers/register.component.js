angular.module("judging-system").directive('register', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/components/register.ng.html',
    controllerAs: 'register',
    controller: function ($scope, $state) {
 
      $scope.credentials = {
        email: '',
        password: ''
      };
 
      $scope.error = '';
 
      $scope.register = () => {
        Accounts.createUser($scope.credentials, (err) => {
          if (err) {
            $scope.error = err;
            console.log(err);
          }
        });
      };
    }
  }
});