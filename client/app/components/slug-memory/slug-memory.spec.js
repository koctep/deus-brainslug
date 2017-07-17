import SlugMemoryModule from './slug-memory'
import SlugMemoryController from './slug-memory.controller';
import SlugMemoryComponent from './slug-memory.component';
import SlugMemoryTemplate from './slug-memory.html';

describe('SlugMemory', () => {
  let $rootScope, makeController;

  beforeEach(window.module(Slug-memoryModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new Slug-memoryController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(Slug-memoryTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SlugMemoryComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SlugMemoryTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SlugMemoryController);
      });
  });
});
