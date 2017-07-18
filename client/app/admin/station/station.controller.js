import angular from 'angular';

import template from './copy_acl.html';
import controller from './copy_acl_controller';

class StationController {
  constructor($rootScope, $stations, $stateParams, $cfg, $state, $mdToast, $mdDialog, $mindStruct) {
    'ngInject';

    this.name = 'station';

    let $this = this;
    this.$stations = $stations;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.$cfg = $cfg;
    this.$root = $rootScope;
    this.$mdDialog = $mdDialog;
    this.$mindStruct = $mindStruct;

    this.hideId = true;
    this.selected = Object.keys($mindStruct.lines)[0];

    if ($stateParams.id === 'add') {
      $rootScope.reload = function() {
        console.debug("adding new station");
        $this.hideId = false;
        $this.station = {
          acl: {},
          memory: {
            first: false,
            second: false,
            other: false
          }
        };
        angular.forEach($mindStruct.lines, function(v, k) {
          console.debug('key %o', k);
          $this.station.acl[k] = [];
          for (var i = 0; i < v.names.length; i++) {
            console.debug('adding %o%o', k, i);
            $this.station.acl[k].push(0);
          }
        });
      };
    } else {
      $rootScope.reload = function() {
        $stations.get($stateParams.id)
          .then(function(response) {
            console.debug("station is %o", response);
            $this.hideId = true;
            $this.station = response;
          });
      };
    }

    $rootScope.reload();
  }

  update() {
    var $this = this;
    this.station.type = 'station';
    console.debug('$st %o', this.$stations);
    this.$stations.set($this.station)
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
    this.$stations.delete(this.station)
      .then(function() {
        $this.$state.go('stations');
      });
  }

  copyAcl() {
    var $this = this;
    $this.$mdDialog.show({
      clickOutsideToClose: true,
      template,
      controller,
      controllerAs: 'vm'
    })
    .then(function(stationId) {
      console.debug('copy acl from %o', stationId);
      $this.$stations.get(stationId)
        .then(function(station) {
          console.debug("station %o", station);
          $this.station.acl = angular.extend({}, station.acl);
        });
    });
  }
}

export default StationController;
