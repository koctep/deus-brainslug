import angular from 'angular';

class OperatorController {
  constructor($rootScope, $mdToast, $char, $state) {
    'ngInject';

    this.name = 'operator';
    this.$rootScope = $rootScope;
    this.$mdToast = $mdToast;
    this.$char = $char;
    this.$state = $state;

    let $this = this;

    $rootScope.reload = function() {
      if (!$rootScope.station) {
        $state.go('init');
      } else {
        setTimeout(function() {
          $this.operator_id = '';
          $this.password = '';
        }, 500);
      }
    };
    $rootScope.reload();
  }

  login() {
    let $this = this;
    let failed = function() {
      $this.$mdToast.showSimple("password or ID is wrong");
      $this.operator_id = '';
      $this.password = '';
      delete $this.operator;
    };
    this.$char.get(this.operator_id, this.password)
      .then(function(operator) {
        console.debug('got operator doc %o', operator);
        $this.$mdToast.showSimple("Operator logged in");
        $this.$rootScope.operator = $this.filterOperatorDoc(operator);
        $this.$state.go('approve');
        $this.$rootScope.creds.operator = {
          id: $this.operator_id,
          password: $this.password
        };
      })
      .catch(failed);
  }

  filterOperatorDoc(doc) {
    return doc;
    let res = {};
    let props = ['_id', 'firstName', 'nicName', 'lastName', 'sex', 'mind', 'memory'];
    angular.forEach(props, function(p) {
      res[p] = doc[p];
    });
    return res;
  }
}

export default OperatorController;
