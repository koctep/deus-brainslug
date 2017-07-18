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

import appConfig from './app.config.json';
import mindStruct from './mind.config.json';

angular.module('app', [
  angularMaterial,
  angularAnimate,
  uiRouter,
  Components.name,
  Navbar.name,

  Admin.name,
])

.constant('$cfgDefault', appConfig)
.constant('$mindStruct', mindStruct)

.config(($locationProvider, $qProvider, $urlRouterProvider, $httpProvider) => {
  "ngInject";

  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
  $qProvider.errorOnUnhandledRejections(false);
  $urlRouterProvider.otherwise('/init');
  $httpProvider.defaults.headers.post = {'Content-Type': 'application/json'};
})

.run(($rootScope, $cfg, $mdToast, $state) => {
  'ngInject';

  $rootScope.disabled = false;
  $rootScope.cfg = $cfg;
  $rootScope.creds = {
    char: null,
    station: null,
    operator: null
  };
  window.r = $rootScope;
  window.r.mdToast = $mdToast;
  window.r.state = $state;
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

.service('$base64', function() {
  return {
    encode: function b64EncodeUnicode(str) {
      // first we use encodeURIComponent to get percent-encoded UTF-8,
      // then we convert the percent encodings into raw bytes which
      // can be fed into btoa.
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1);
            }));
    }
  };
})

.service('$stations', ['$q', '$http', '$cfg', '$base64', ($q, $http, $cfg, $base64) => {
  var config =  {
    headers: {
      Authorization: 'Basic ' + $base64.encode('mind-admin:5yfzcQAw')
    }
  };

  return {
    ls: function() {
      var res = $q.defer();

      $http.get('https://alice.digital:6984/mind-editor/_all_docs?include_docs=true', config)
        .then(function(data) {
          var stations = [];
          angular.forEach(data.data.rows, function(v) {
            stations.push(v.doc);
          });
          res.resolve(stations);
        });

      return res.promise;
    },
    get: function(id) {
      var res = $q.defer();

      $http.get('https://alice.digital:6984/mind-editor/' + id, config)
        .then(function(data) {
          res.resolve(data.data);
        });

      return res.promise;
    },
    set: function(id) {
      var res = $q.defer();

      $http.post('https://alice.digital:6984/mind-editor', id, config)
        .then(function(data) {
          res.resolve(data);
        });
      return res.promise;
    },
    delete: function(station) {
      var res = $q.defer();

      $http.delete('https://alice.digital:6984/mind-editor/' + station._id + '?rev=' + station._rev, config)
        .then(function(data) {
          res.resolve(data);
        });
      return res.promise;
    }
  };
}])

.service('$char', ['$http', '$base64', '$q', '$rootScope', function($http, $base64, $q, $rootScope) {
  return {
    get: function(id, password) {
      var res = $q.defer();

      var config = {
        headers: {
          Authorization: 'Basic ' + $base64.encode(id + ':' + password)
        }
      };

      $http.get('https://alice.digital/api/viewmodel/' + id + '?type=medic', config)
        .then(function(data) {
          console.debug('recv %o', data);
          res.resolve(data.data);
        });

      return res.promise;
    },
    event: function(eventType, data) {
      var res = $q.defer();

      $http.get('https://alice.digital/api/time')
        .then(function(timeResp) {
          var req = {
            eventType: eventType,
            data: data,
            characterId: $rootScope.creds.char.id,
            timestamp: timeResp.data.serverTime + 5000
          };
          console.debug('req %o', req);
          var config = {
            headers: {
              Authorization: 'Basic ' + $base64.encode($rootScope.creds.char.id + ':' + $rootScope.creds.char.password)
            }
          };
          $http.post('https://alice.digital/api/events/' + $rootScope.creds.char.id, {events: [req]}, config)
            .then(function(resp) {
              res.resolve(resp);
            });
        });
      return res.promise;
    }
  };
}])

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
    getDoc: function(id) {
      console.debug("getting doc %o", id);
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
    },
    patchDoc: function(doc) {
      var res = $q.defer();
      let $this = this;
      this.getDoc(doc._id)
        .then(function(oldDoc) {
          let newDoc = angular.extend(oldDoc, doc);
          $this.publish(newDoc).
            then(function(response) {
              res.resolve(response);
            });
        });
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
