class StationsController {
  constructor($rootScope, $stations) {
    'ngInject';

    this.name = 'stations';

    let $this = this;

    this.stations = [];

    $rootScope.reload = function() {
      $stations.ls()
        .then(function(response) {
          console.debug("get %o", response);
          $this.stations = response || [];
        });
    };
    $rootScope.reload();
  }
}

export default StationsController;
