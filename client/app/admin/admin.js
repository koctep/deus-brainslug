import angular from 'angular';
import Stations from './stations/stations';
import Station from './station/station';

let adminModule = angular.module('app.admin', [
  Stations.name,
  Station.name,
]);

export default adminModule;
