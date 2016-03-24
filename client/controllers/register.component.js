Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

angular.module("judging-system").directive('register', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/components/register.ng.html',
    controllerAs: 'register',
    controller: function ($scope, $state) {
// <<<<<<< HEAD:client/controllers/register.component.js
 
// =======


// >>>>>>> 1be4503cfcf755e29a5c709667f39c66a2392007:client/controllers/register.component.js
      $scope.credentials = {
        username: '',
        email: '',
        password: ''
      };

      $scope.error = '';

      $scope.register = () => {
        Accounts.createUser($scope.credentials, (err) => {
          if (err) {
            Bert.alert("" + err, 'danger', 'fixed-top');
          }
        });
      };// end register

    }
  }
});
