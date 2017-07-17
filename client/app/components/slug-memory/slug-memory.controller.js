class SlugMemoryController {
  constructor($rootScope, $api, $state) {
    'ngInject';

    this.name = 'slug-memory';

    if (!$rootScope.station || !$rootScope.char) {
      $state.go('init');
    }

    let $this = this;
    $this.$api = $api;
    $this.$rootScope = $rootScope;

    $rootScope.reload = function() {
    };
  }
}

export default SlugMemoryController;
