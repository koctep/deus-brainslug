import angular from 'angular';
import uiRouter from 'angular-ui-router';
import approveComponent from './approve.component';

let approveModule = angular.module('approve', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('approve', {
      url: '/approve',
      template: '<approve></approve>'
    });
})

.component('approve', approveComponent);

export default approveModule;
