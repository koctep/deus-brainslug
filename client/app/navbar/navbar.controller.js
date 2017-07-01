class NavbarController {
  constructor($scope, $mdSidenav, $log) {
    'ngInject';
    this.name = "navbar";
    this.$mdSidenav = $mdSidenav;
    this.$log = $log;

    $scope.toggleLeft = this.buildToggler('left');
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  buildToggler(navID) {
    var vm = this;
    return () => {
      this.$mdSidenav(navID)
        .toggle()
        .then(function() {
          vm.$log.debug("toggle " + navID + " is done");
        });

    };
  }

  closeLeft() {
    this.$mdSidenav('left').close()
      .then(function() {
        this.$log.debug("close LEFT is done");
      });
  }

  closeRight() {
    this.$mdSidenav('right').close()
      .then(function() {
        this.$log.debug("close RIGHT is done");
      });
  }
}

export default NavbarController;
