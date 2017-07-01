import angular from 'angular';
import uiRouter from 'angular-ui-router';
import initComponent from './init.component';

let initModule = angular.module('init', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('init', {
      url: '/init',
      template: '<init></init>'
    });
})

.component('init', initComponent);

export default initModule;
