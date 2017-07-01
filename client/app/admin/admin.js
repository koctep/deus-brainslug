import angular from 'angular';
import Stations from './stations/stations';

let adminModule = angular.module('app.admin', [
  Stations.name
]);

export default adminModule;
