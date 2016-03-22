import _ from 'lodash';
class HomeController {

  /**
   * Constructor class HomeController
   *
   * @param {object} $scope
   */
  constructor($scope, $timeout, $mdSidenav, $log) {
    'ngInject';

    this.name = "HomeController";
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.$mdSidenav = $mdSidenav;
    this.$log = $log;

    $scope.toggleLeft = this.buildDelayedToggler('left');
    $scope.toggleRight = this.buildToggler('right');
    $scope.isOpenRight = function() {
      return $mdSidenav('right').isOpen();
    };
  };

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  buildDelayedToggler(navID) {
    var vm = this;
    return _.debounce(() => {
      this.$mdSidenav(navID)
        .toggle()
        .then(function() {
          vm.$log.debug("toggle " + navID + " is done");
        });

    }, 200);
  }

  buildToggler(navID) {
    var vm = this;
    return function() {
      vm.$mdSidenav(navID)
        .toggle()
        .then(() => {
          vm.$log.debug("toggle " + navID + " is done");
        });
    };
  }
}

export default HomeController;
