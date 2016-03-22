import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import AppController from './app.controller';

var app = angular.module('app', [
  angularMaterial,
  angularAnimate,
  uiRouter,
  Common.name,
  Components.name
]);


app.config(($locationProvider) => {
  "ngInject";
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
});

app.controller(AppController.name, AppController);

app.component('app', AppComponent);
