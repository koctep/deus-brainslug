class <%= upCaseName %>Controller {
  constructor($rootScope) {
    'ngInject';

    this.name = '<%= name %>';

    let $this = this;

    $rootScope.reload = function() {
    };
    $rootScope.reload();
  }
}

export default <%= upCaseName %>Controller;
