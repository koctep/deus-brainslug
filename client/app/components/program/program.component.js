import template from './program.html';
import controller from './program.controller';
import './program.scss';

let programComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default programComponent;
