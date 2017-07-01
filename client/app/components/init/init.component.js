import template from './init.html';
import controller from './init.controller';
import './init.scss';

let initComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default initComponent;
