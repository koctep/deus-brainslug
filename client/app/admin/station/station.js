import angular from 'angular';
import uiRouter from 'angular-ui-router';
import stationComponent from './station.component';

let stationModule = angular.module('station', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('station', {
      url: '/admin/station/:id',
      template: '<station></station>'
    });
})

.component('station', stationComponent);

export default stationModule;
