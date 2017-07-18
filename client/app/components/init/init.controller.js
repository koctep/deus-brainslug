import angular from 'angular';

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
        if (station.enabled === false) {
          console.debug('station is disabled');
          $this.$mdToast.showSimple('This station is disabled');
          $this.$state.go('init');
        } else if (station.password === $this.password) {
          console.debug('password accepted');
          $this.$mdToast.showSimple("password accepted for '" + station.name + "'");
          $this.$rootScope.station = station;
          var options = [];
          if (station.memory.first || station.memory.second || station.memory.other) {
            options.push('memory');
          }
          angular.forEach(station.acl, function(v, k) {
            if (options[0] === 'mind' || options[1] === 'mind') { return; }
            angular.forEach(station.acl[k], function(v, i) {
              if (options[0] === 'mind' || options[1] === 'mind') { return; }
              if (v > 0) { options.push('mind'); }
            });
          });
          console.debug('options %o', options);
          if (options.length === 2) {
            $this.$state.go('program');
          } else if (options[0] === 'mind') {
            $this.$rootScope.program = 'mind';
            $this.$state.go('operator');
          } else if (options[0] === 'memory') {
            $this.$rootScope.program = 'memory';
            $this.$state.go('operator');
          } else {
            $this.$mdToast.showSimple("this station doesn't have access to mind/memory");
            $this.$state.go('init');
          }
        } else {
          console.debug('password is not matched');
          failed();
        }
      })
      .catch(failed);
  }
}

export default InitController;
