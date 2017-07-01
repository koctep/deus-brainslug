import 'angular-material/angular-material.css';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import Navbar from './navbar/navbar';
import Components from './components/components';

import AppComponent from './app.component';
import AppController from './app.controller';

import Admin from './admin/admin';

angular.module('app', [
  angularMaterial,
  angularAnimate,
  uiRouter,
  Components.name,
  Navbar.name,

  Admin.name,
])

.constant('$cfgDefault', {
  reqTimeout: 5,
  couchDbUrl: 'http://localhost:5984'
})

.config(($locationProvider, $qProvider, $urlRouterProvider) => {
  "ngInject";

  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
  $qProvider.errorOnUnhandledRejections(false);
  $urlRouterProvider.otherwise('/init');
})

.run(($rootScope, $cfg) => {
  'ngInject';

  $rootScope.disabled = false;
  $rootScope.cfg = $cfg;
  window.r = $rootScope;
})

.service('$cfg', function($http, $cfgDefault) {
  'ngInject';

  var res = angular.extend({}, $cfgDefault);

  $http.get('/config.json')
    .then(function(result) {
      angular.extend(res, result.data);
    });
  return res;
})

.service('$couch', function($http, $q, $cfg) {
  'ngInject';

  return {
    view: function() {
      var res = $q.defer();
      $http.get($cfg.couchDbUrl, {timeout: $cfg.reqTimeout})
        .then(function() {
          res.resolve([1,2]);
        })
        .catch(function(response) {
          console.debug("failed, response %o", response);
          res.reject(response);
        })
      ;
      return res.promise;
    }
  };
})

.service('$api', ($couch, $rootScope, $reloader, $log, $q, $mdToast)  => {
  'ngInject';

  $rootScope.couch = $couch;
  $rootScope.runned = 0;
  $rootScope.$watch('runned', function(val) {
    if (val > 0) {
      $reloader.start();
    } else {
      $reloader.stop();
    }
  });

  return {
    lsStations: function() {
      var res = $q.defer();

      $couch.view()
        .then(function(response) {
          res.resolve(response);
        })
        .catch(function(response) {
          $mdToast.showSimple("failed query database");
          res.resolve(null);
        })
      ;
      return res.promise;
    }
  };
})

.service('$reloader', ($rootScope) => {
  'ngInject';
  let reloader = {};
  let $ = function() {
    return document.getElementById('reload');
  };
  reloader.stop = function() {
    if ($()) {
      $().pauseAnimations();
    }
    return reloader;
  };
  reloader.start = function() {
    if ($()) {
      $().unpauseAnimations();
    }
    return reloader;
  };
  return reloader;
})

.controller(AppController.name, AppController)

.component('app', AppComponent)

;
