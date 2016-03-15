angular.module("judging-system").directive('sidebar', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/components/sidebar.ng.html',
    controllerAs: 'sidebar',
    controller: function ($scope, $timeout, $mdSidenav, $log) {

      $scope.toggleLeft = buildToggler('left');
      $scope.hiddenLink = (Accounts.userId()===null) ? true : false;

      $scope.isOpenLeft = function() {
        return $mdSidenav('left').isOpen();
      };

      //Supplies a function that will continue to operate until the time is up.
      function debounce(func, wait, context) {
        var timer;
        return function debounced() {
          var context = $scope,
              args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }

      //Build handler to open/close a SideNav; when animation finishes report completion in console
      function buildDelayedToggler(navID) {
        return debounce(function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }, 200);
      }
      function buildToggler(navID) {
        return function() {
          $scope.hiddenLink = (Accounts.userId()===null) ? true : false;
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }
      }
    }
  }
})

angular.module('judging-system').controller('LeftCtrl', function ($scope, $meteor, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close left is done");
        });
    };
});