import angular from 'angular';
import Init from './init/init';
import Approve from './approve/approve';
import Slug from './slug/slug';
import Mind from '../mind/mind';

let componentModule = angular.module('app.components', [
  Init.name,
  Approve.name,
  Slug.name,
  Mind.name
]);

export default componentModule;
