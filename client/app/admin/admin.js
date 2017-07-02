import angular from 'angular';
import Stations from './stations/stations';
import Station from './station/station';

import Acl from '../mind/acl/acl';

let adminModule = angular.module('app.admin', [
  Stations.name,
  Station.name,
  Acl.name
]);

export default adminModule;
