import angular from 'angular';
import uiRouter from 'angular-ui-router';
import stationsComponent from './stations.component';

let stationsModule = angular.module('stations', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('stations', {
      url: '/admin/stations',
      template: '<stations></stations>'
    });
})

.component('stations', stationsComponent);

export default stationsModule;
