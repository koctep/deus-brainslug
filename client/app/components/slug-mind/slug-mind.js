import angular from 'angular';
import uiRouter from 'angular-ui-router';
import slugMindComponent from './slug-mind.component';

let slugMindModule = angular.module('slug-mind', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('slug/mind', {
      url: '/slug/mind',
      template: '<slug-mind></slug-mind>'
    });
})

.component('slugMind', slugMindComponent);

export default slugMindModule;
