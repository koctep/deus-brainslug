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

    console.debug("char %o", this.char);

    $rootScope.reload = function() {
      $api.getDoc($rootScope.char._id)
        .then(function(newChar) {
          $rootScope.char = newChar;
          $this.char = $rootScope.char;
        });
    };
  }

  save() {
    this.$api.patchDoc(this.$rootScope.char);
  }

}

export default SlugController;
