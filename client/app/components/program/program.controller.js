class ProgramController {
  constructor($rootScope, $state) {
    'ngInject';

    this.name = 'program';

    this.$state = $state;
    this.$rootScope = $rootScope;

    console.debug('program');
    if (!$rootScope.station) {
      $state.go('init');
    }
  }

  select(dest) {
    console.debug('dest "%o"', dest);
    this.$rootScope.program = dest;
    this.$state.go('operator');
  }
}

export default ProgramController;
