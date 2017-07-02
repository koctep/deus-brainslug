import template from './acl.html';
import controller from './acl.controller';
import './acl.scss';

let aclComponent = {
  restrict: 'E',
  require: {station: '^station'},
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default aclComponent;
