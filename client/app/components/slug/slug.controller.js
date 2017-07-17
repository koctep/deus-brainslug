import angular from 'angular';

class SlugController {
  constructor($rootScope, $api, $state, $mindStruct) {
    'ngInject';

    if (!$rootScope.char || !$rootScope.station) {
      $state.go('init');
      return;
    }
    this.name = 'slug';
    this.char = $rootScope.char;
    this.selected = Object.keys($mindStruct.lines)[0];
    this.$mindStruct = $mindStruct;
    this.$rootScope = $rootScope;
    this.$api = $api;

    let $this = this;

    window.r = $rootScope;


    var applyAcl = function() {
      angular.forEach($rootScope.station.acl, function(v, k) {
        for (var i = 0; i < v.length; i++) {
          if (v[i] === 0) {
            $rootScope.char.mind[k][i] = -1;
          }
        }
      });
    };

    $rootScope.reload = function() {
      $api.getDoc($rootScope.char._id)
        .then(function(newChar) {
          $this.char = newChar;
          $this.$rootScope.char = newChar;
          applyAcl();
        });
    };
    applyAcl();
  }

  save() {
    var $this = this;
    this.$api.getDoc($this.$rootScope.char._id)
      .then(function(char) {
        angular.forEach($this.$rootScope.char.mind, function(v, k) {
          for (var i = 0; i < v.length; i++) {
            if ($this.$rootScope.char.mind[k][i] !== -1) {
              char.mind[k][i] = $this.$rootScope.char.mind[k][i];
            }
          }
        });
        $this.$api.patchDoc(char);
      });
  }

}

export default SlugController;
