class CopyAclController {
  constructor($mdDialog, $stations) {
    'ngInject';

    var $this = this;

    this.$mdDialog = $mdDialog;

    this.stations = [];

    $stations.ls()
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
