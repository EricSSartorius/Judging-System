angular.module('judging-system').controller('RootCtrl', function ($scope) {   
    $scope.logout = () => {
        Accounts.logout();
   }
});