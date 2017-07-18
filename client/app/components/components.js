import angular from 'angular';
import Init from './init/init';
import Approve from './approve/approve';
import SlugMind from './slug-mind/slug-mind';
import SlugMemory from './slug-memory/slug-memory';
import Operator from './operator/operator';
import Program from './program/program';
import Feedback from './feedback/feedback';

let componentModule = angular.module('app.components', [
  Init.name,
  Approve.name,
  SlugMind.name,
  SlugMemory.name,
  Operator.name,
  Program.name,
  Feedback.name
]);

export default componentModule;
