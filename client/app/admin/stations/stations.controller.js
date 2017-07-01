class StationsController {
  constructor($rootScope, $api) {
    'ngInject';

    this.name = 'stations';

    let $this = this;

    this.stations = [];

    $rootScope.reload = function() {
      $api.lsStations()
        .then(function(response) {
          console.debug("get %o", response);
          $this.stations = response || [];
        });
    };
    $rootScope.reload();
  }
}

export default StationsController;
