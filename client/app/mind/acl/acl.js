import angular from 'angular';
import aclComponent from './acl.component';
import mindStruct from '../mind.config.json';

let aclModule = angular.module('acl', [])
.constant('$mindStruct', mindStruct)
.component('acl', aclComponent);

export default aclModule;
