import template from './stations.html';
import controller from './stations.controller';
import './stations.scss';

let stationsComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default stationsComponent;
