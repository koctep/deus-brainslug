class AclController {
  constructor($rootScope, $mindStruct) {
    'ngInject';

    this.name = 'acl';
    this.mindStruct = $mindStruct;

    console.debug('acl %o', this);
  }
}

export default AclController;
