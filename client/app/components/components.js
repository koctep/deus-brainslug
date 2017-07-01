import angular from 'angular';
import Init from './init/init';

let componentModule = angular.module('app.components', [
  Init.name
]);

export default componentModule;
