class SlugController {
  constructor($rootScope, $api, $state) {
    'ngInject';

    if (!$rootScope.char || !$rootScope.station) {
      $state.go('init');
      return;
    }
    this.name = 'slug';
    this.char = $rootScope.char;
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
}

export default SlugController;
