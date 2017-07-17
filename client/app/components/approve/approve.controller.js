import angular from 'angular';

class ApproveController {
  constructor($rootScope, $mdToast, $api, $state) {
    'ngInject';

    this.name = 'approve';
    this.$rootScope = $rootScope;
    this.$mdToast = $mdToast;
    this.$api = $api;
    this.$state = $state;

    let $this = this;

    $rootScope.reload = function() {
      if (!$rootScope.station) {
        $state.go('init');
      } else {
        $this.char_id = '';
        $this.password = '';
      }
    };
    $rootScope.reload();
  }

  login() {
    let $this = this;
    let failed = function() {
      $this.$mdToast.showSimple("password or ID is wrong");
      $this.char_id = '';
      $this.password = '';
      delete $this.char;
    };
    this.$api.getDoc(this.char_id)
      .then(function(char) {
        console.debug('got char doc');
//        if (char.password === $this.password) {
        $this.$mdToast.showSimple("Access granted");
        $this.$rootScope.char = $this.filterCharDoc(char);
        $this.$state.go('slug/mind');
//        } else {
//          failed();
//        }
      })
      .catch(failed);
  }

  filterCharDoc(doc) {
    let res = {};
    let props = ['_id', 'firstName', 'nicName', 'lastName', 'sex', 'mind', 'memory'];
    angular.forEach(props, function(p) {
      res[p] = doc[p];
    });
    return res;
  }
}

export default ApproveController;
