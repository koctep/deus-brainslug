import angular from 'angular';
import uiRouter from 'angular-ui-router';
import slugMemoryComponent from './slug-memory.component';

let slugMemoryModule = angular.module('slug-memory', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('slug/memory', {
      url: '/slug/memory',
      template: '<slug-memory></slug-memory>'
    });
})

.component('slugMemory', slugMemoryComponent);

export default slugMemoryModule;
