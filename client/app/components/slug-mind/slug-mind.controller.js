import angular from 'angular';

class SlugMindController {
  constructor($rootScope, $char, $state, $mindStruct) {
    'ngInject';

    console.debug('slug mind');
    if (!$rootScope.char || !$rootScope.station) {
      $state.go('init');
      return;
    }
    this.name = 'slug';
    this.char = $rootScope.char;
    this.selected = Object.keys($mindStruct.lines)[0];
    this.$mindStruct = $mindStruct;
    this.$rootScope = $rootScope;
    this.$char = $char;

    let $this = this;

    window.r = $rootScope;


    var applyAcl = function() {
      angular.forEach($rootScope.station.acl, function(v, k) {
        for (var i = 0; i < v.length; i++) {
          if (v[i] === 0) {
            $rootScope.char.viewModel.mind[k][i] = -1;
          }
        }
      });
    };

    $rootScope.reload = function() {
      $char.getDoc($rootScope.creds.char.id, $rootScope.creds.char.password)
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
    var action = [];
    angular.forEach($this.$rootScope.char.viewModel.mind, function(v, k) {
      for (var i = 0; i < v.length; i++) {
        if ($this.$rootScope.char.viewModel.mind[k][i] !== -1) {
          action.push('' + k + i + '=' + $this.$rootScope.char.viewModel.mind[k][i]);
          //char.viewModel.mind[k][i] = $this.$rootScope.char.viewModel.mind[k][i];
        }
      }
    });
    console.debug('change %o', action.join(','));
    this.$char.event('change-mind-cube', {operations: action.join(',')});
    //$this.$char.set(char);
  }

}

export default SlugMindController;
