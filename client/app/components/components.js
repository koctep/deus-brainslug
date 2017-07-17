import angular from 'angular';
import Init from './init/init';
import Approve from './approve/approve';
import Slug from './slug/slug';

let componentModule = angular.module('app.components', [
  Init.name,
  Approve.name,
  Slug.name
]);

export default componentModule;
