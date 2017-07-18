import template from './operator.html';
import controller from './operator.controller';
import './operator.scss';

let operatorComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default operatorComponent;
