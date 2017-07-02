import template from './station.html';
import controller from './station.controller';
import './station.scss';

let stationComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default stationComponent;
