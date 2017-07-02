import angular from 'angular';

import mindStruct from './mind.config.json';

import Alc from './acl/acl';

let mindModule = angular.module('app.mind', [
    Acl.name
])
.constant('$mindStruct', mindStruct)
;

export default mindModule;
