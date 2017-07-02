class CopyAclController {
  constructor($mdDialog, $api) {
    'ngInject';

    var $this = this;

    this.$mdDialog = $mdDialog;

    this.stations = [];

    $api.lsStations()
      .then(function(stations) {
        $this.stations = stations;
      });
  }

  choose(id) {
    console.debug("choosen %o", id);
    this.$mdDialog.hide(id);
  }
}

export default CopyAclController;
