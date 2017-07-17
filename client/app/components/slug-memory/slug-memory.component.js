import template from './slug-memory.html';
import controller from './slug-memory.controller';
import './slug-memory.scss';

let slugMemoryComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default slugMemoryComponent;
