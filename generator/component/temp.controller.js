class <%= upCaseName %>Controller {
  constructor() {
    'ngInject';

    this.name = '<%= name %>';

    let $this = this;

    $rootScope.reload = function() {
    };
    $rootScope.reload();
  }
}

export default <%= upCaseName %>Controller;
