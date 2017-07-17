import angular from 'angular';
import mindStruct from '../mind.config.json';
import charMindComponent from './charMind.component';

let charMindModule = angular.module('charmind', [])

.constant('$mindStruct', mindStruct)
.component('charMind', charMindComponent);

export default charMindModule;
