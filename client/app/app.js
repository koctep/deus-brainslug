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
  reqTimeout: 5000,
  couchDbUrl: 'http://localhost:5984',
  couchDb: 'brainslug',
  maxStationId: 100000
})

.config(($locationProvider, $qProvider, $urlRouterProvider, $httpProvider) => {
  "ngInject";

  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
  $qProvider.errorOnUnhandledRejections(false);
  $urlRouterProvider.otherwise('/init');
  $httpProvider.defaults.headers.post = {'Content-Type': 'application/json'};
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

.service('$couch', function($http, $q, $cfg, $mdToast) {
  'ngInject';

  return {
    view: function(view, p) {
      var res = $q.defer();
      var params = "";
      angular.forEach(p || {}, function(v, k) {
        params += '&' + k + '=' + encodeURI(v);
      });
      var url = [$cfg.couchDbUrl, $cfg.couchDb, "_design", "brainslug", "_view", view].join('/') + '?ts=' + Date.now() + params;
      var opts = {};
      ($cfg.reqTimeout) ? opts.timeout = $cfg.reqTimeout : null;
      console.debug("opts %o", opts);
      $http.get(url, opts)
        .then(function(response) {
          res.resolve(response.data.rows);
        })
        .catch(function(response) {
          console.debug("failed, response %o", response);
          $mdToast.showSimple("failed query database");
          res.resolve(null);
        })
      ;
      return res.promise;
    },
    doc: function(id) {
      var res = $q.defer();
      var url = [$cfg.couchDbUrl, $cfg.couchDb, id].join('/');
      $http.get(url)
        .then(function(response) {
          res.resolve(response.data);
        })
        .catch(function(response) {
          res.resolve(null);
        });
      return res.promise;
    },
    publish: function(doc) {
      var res = $q.defer();
      var url = [$cfg.couchDbUrl, $cfg.couchDb].join('/');
      $http.post(url, doc)
        .then(function(response) {
          res.resolve(response.data);
        })
        .catch(function(response) {
          res.reject(response);
        });
      return res.promise;
    },
    delete: function(id) {
      var res = $q.defer();
      var url = [$cfg.couchDbUrl, $cfg.couchDb, encodeURI(id)].join('/');
      $http.delete(url)
        .then(function(response) {
          res.resolve(response.data);
        })
        .catch(function(response) {
          res.reject(response);
        });
      return res.promise;
    }
  };
})

.service('$api', ($couch, $rootScope, $reloader, $q)  => {
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

      $couch.view('stations', {include_docs: true})
        .then(function(response) {
          var r = (response || []).map(function(v) {
            return v.doc;
          });
          res.resolve(r);
        });
      return res.promise;
    },
    getStation: function(id) {
      var res = $q.defer();

      $couch.doc(id)
        .then(function(response) {
          res.resolve(response);
        });
      return res.promise;
    },
    publish: function(doc) {
      var res = $q.defer();

      $couch.publish(doc)
        .then(function(response) {
          res.resolve(response);
        });
      return res.promise;
    },
    delete: function(doc) {
      doc._deleted = true;
      return this.publish(doc);
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
