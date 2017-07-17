import angular from 'angular';
import Init from './init/init';
import Approve from './approve/approve';
import SlugMind from './slug-mind/slug-mind';
import SlugMemory from './slug-memory/slug-memory';

let componentModule = angular.module('app.components', [
  Init.name,
  Approve.name,
  SlugMind.name,
  SlugMemory.name
]);

export default componentModule;
