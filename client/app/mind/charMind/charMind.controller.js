class CharMindController {
  constructor($rootScope, $mindStruct, $api) {
    'ngInject';

    this.name = 'charMind';

    this.$rootScope = $rootScope;
    this.$mindStruct = $mindStruct;
    this.$api = $api;

    this.selected = Object.keys($mindStruct.lines)[0];

    $rootScope.reload = function() {
    };
  }

  save() {
    this.$api.patchDoc(this.$rootScope.char);
  }
}

export default CharMindController;
