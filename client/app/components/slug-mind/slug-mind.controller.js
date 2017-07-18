import angular from 'angular';

class SlugMindController {
  constructor($rootScope, $char, $state, $mindStruct, mindAction) {
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
    this.mindAction = mindAction;
    this.$state = $state;

    let $this = this;

    window.r = $rootScope;


    var applyAcl = function() {
      angular.forEach($rootScope.station.acl, function(v, k) {
        for (var i = 0; i < v.length; i++) {
          if (v[i] === 0) {
            $rootScope.char.viewModel.mindBase[k][i] = -1;
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
    this.$char.get(this.$rootScope.creds.char.id, this.$rootScope.creds.char.password)
      .then(function(char) {
        angular.forEach($this.$rootScope.char.viewModel.mindBase, function(v, k) {
          for (var i = 0; i < v.length; i++) {
            if ($this.$rootScope.char.viewModel.mindBase[k][i] !== -1 &&
                $this.$rootScope.char.viewModel.mindBase[k][i] !== char.viewModel.mindBase[k][i]) {
              action.push({key: k + i, value: $this.$rootScope.char.viewModel.mindBase[k][i] - char.viewModel.mindBase[k][i]});
              console.debug('change %o', action);
              //console.debug('maped %o', action.map($this.mindAction));
              $this.$char.event('change-mind-cube', {operations: action.map($this.mindAction).join(',')});
              console.debug('published');
              $this.$rootScope.changed = action;
              console.debug('changing state');
              $this.$state.go('feedback');
            }
          }
        });
      });
    //$this.$char.set(char);
  }

}

export default SlugMindController;
