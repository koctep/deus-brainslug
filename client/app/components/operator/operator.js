import angular from 'angular';
import uiRouter from 'angular-ui-router';
import operatorComponent from './operator.component';

let operatorModule = angular.module('operator', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('operator', {
      url: '/operator',
      template: '<operator></operator>'
    });
})

.component('operator', operatorComponent);

export default operatorModule;
