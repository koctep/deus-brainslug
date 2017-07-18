import angular from 'angular';
import uiRouter from 'angular-ui-router';
import programComponent from './program.component';

let programModule = angular.module('program', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('program', {
      url: '/program',
      template: '<program></program>'
    });
})

.component('program', programComponent);

export default programModule;
