class StationController {
  constructor($rootScope, $api, $stateParams, $cfg, $state, $mdToast) {
    'ngInject';

    this.name = 'station';

    let $this = this;
    this.$api = $api;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.$cfg = $cfg;
    this.$root = $rootScope;

    this.hideId = true;
    this.station = {};

    $rootScope.reload = function() {
      if ($stateParams.id !== 'add') {
        $api.getStation($stateParams.id)
          .then(function(response) {
            console.debug("station is %o", response);
            $this.hideId = true;
            $this.station = response;
          });
      } else {
        $this.hideId = false;
      }
    };
    $rootScope.reload();
  }

  update() {
    var $this = this;
    this.station.type = 'station';
    this.$api.publish($this.station)
      .then(function() {
        $this.$state.go('stations');
      });
  }

  add() {
    if (!this.station._id) {
      this.$mdToast.showSimple('Id should be set');
      return;
    }
    if (!this.station.name) {
      this.$mdToast.showSimple('Name should be set');
      return;
    }
    this.station._id += '';
    this.update();
  }

  generateId() {
    this.station._id = Math.round('' + Math.random() * this.$cfg.maxStationId);
  }

  dismissChanges() {
    this.$root.reload();
  }

  erase() {
    this.station = this.hideId ? {_id: this.station._id} : {};
  }

  delete() {
    if (!confirm('Are sure want to delete this station?')) { return; }
    var $this = this;
    this.$api.delete(this.station)
      .then(function() {
        $this.$state.go('stations');
      });
  }
}

export default StationController;
