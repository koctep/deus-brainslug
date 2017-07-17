import template from './charMind.html';
import controller from './charMind.controller';
import './charMind.scss';

let charMindComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default charMindComponent;
