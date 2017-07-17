import angular from 'angular';
import uiRouter from 'angular-ui-router';
import slugComponent from './slug.component';

let slugModule = angular.module('slug', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('slug', {
      url: '/slug',
      template: '<slug></slug>'
    });
})

.component('slug', slugComponent);

export default slugModule;
