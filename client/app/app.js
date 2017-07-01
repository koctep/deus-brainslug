import 'angular-material/angular-material.css';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import Navbar from './navbar/navbar';
import Components from './components/components';

import AppComponent from './app.component';
import AppController from './app.controller';

var app = angular.module('app', [
  angularMaterial,
  angularAnimate,
  uiRouter,
  Components.name,
  Navbar.name
]);

app.config(($locationProvider, $qProvider, $urlRouterProvider) => {
  "ngInject";

  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
  $qProvider.errorOnUnhandledRejections(false);
  $urlRouterProvider.otherwise('/init');
});

app.controller(AppController.name, AppController);

app.component('app', AppComponent);
