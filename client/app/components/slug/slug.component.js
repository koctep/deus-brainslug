import template from './slug.html';
import controller from './slug.controller';
import './slug.scss';

let slugComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default slugComponent;
