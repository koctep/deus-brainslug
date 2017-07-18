import angular from 'angular';

class SlugMemoryController {
  constructor($rootScope, $char, $state) {
    'ngInject';

    this.name = 'slug-memory';

    if (!$rootScope.station || !$rootScope.char) {
      $state.go('init');
    }

    let $this = this;
    $this.$char = $char;
    $this.$rootScope = $rootScope;

    $rootScope.reload = function() {
    };
  }

  save() {
    var update = [];
    var rm = [];
    var add = [];
    angular.forEach(this.$rootScope.char.viewModel.memory, function(v) {
      if (v.added) {
        delete v.added;
        add.push(v);
        return;
      }
      if (v.removed) {
        rm.push(v.mID);
        return;
      }
      delete v.added;
      delete v.removed;
      update.push(v);
    });
    var req = {};
    if (update.length > 0) {
      req.update = update;
    }
    if (rm.length > 0) {
      req.remove = rm;
    }
    if (add.length > 0) {
      req.add = add;
    }
    this.$char.event('change-memory', req);
  }
}

export default SlugMemoryController;
