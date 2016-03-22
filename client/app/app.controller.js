import _ from 'lodash';

class AppController {
  constructor($rootScope, $scope, $mdSidenav, $log) {
    'ngInject';
    this.name = "AppController";
    this.$mdSidenav = $mdSidenav;
    this.$log = $log;

    $scope.toggleLeft = this.buildDelayedToggler('left');

    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
      this.$log.debug("stateChangeSuccess", event, toState, toParams, fromState, fromParams);

      this.closeLeft();
    });
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  buildDelayedToggler(navID) {
    return _.debounce(() => {
      this.$mdSidenav(navID)
        .toggle()
        .then(function() {
          this.$log.debug("toggle " + navID + " is done");
        });

    }, 200);
  }

  closeLeft() {
    this.$mdSidenav('left').close()
      .then(() => {
        this.$log.debug("close LEFT is done");
      });
  }

  closeRight() {
    this.$mdSidenav('right').close()
      .then(() => {
        this.$log.debug("close RIGHT is done");
      });
  }
}

export default AppController;
