import angular from 'angular';

import mindStruct from './mind.config.json';

import Acl from './acl/acl';
import CharMind from './charMind/charMind';

let mindModule = angular.module('app.mind', [
  Acl.name,
  CharMind.name
])
.constant('$mindStruct', mindStruct)
;

export default mindModule;
