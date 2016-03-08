angular.module('judging-system').controller('RootCtrl', function ($scope, $angularMeteorSettings) {   
    $scope.logout = () => {
        Accounts.logout();
   }
   $angularMeteorSettings.suppressWarnings = true; // Disables write of warnings to console
});