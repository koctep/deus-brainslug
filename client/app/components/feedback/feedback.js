import angular from 'angular';
import uiRouter from 'angular-ui-router';
import feedbackComponent from './feedback.component';

let feedbackModule = angular.module('feedback', [uiRouter])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('feedback', {
      url: '/feedback',
      template: '<feedback></feedback>'
    });
})

.component('feedback', feedbackComponent);

export default feedbackModule;
