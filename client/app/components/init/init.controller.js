class InitController {
  constructor($stations, $state, $mdToast, $rootScope) {
    'ngInject';

    this.$stations = $stations;
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.$rootScope = $rootScope;
  }

  login() {
    console.debug("login %o", this);
    var $this = this;
    let failed = function() {
      $this.$mdToast.showSimple("Station Id or password is wrong");
      $this.station_id = "";
      $this.password = "";
      delete $this.station;
    };
    this.$stations.get(this.station_id)
      .then(function(station) {
        if (station.password === $this.password) {
          $this.$mdToast.showSimple("password accepted for '" + station.name + "'");
          $this.$rootScope.station = station;
          $this.$state.go('approve');
        } else {
          failed();
        }
      })
      .catch(failed);
  }
}

export default InitController;
