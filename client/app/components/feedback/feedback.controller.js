class FeedbackController {
  constructor($rootScope, $state, $char, mindAction) {
    'ngInject';

    this.name = 'feedback';

    if (!$rootScope.station || !$rootScope.char) {
      $state.go('init');
    }

    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$char = $char;
    this.mindAction = mindAction;
  }

  save() {
    var percent = 0;
    if (this.operator === 'support' && this.client === 'alliance') {
      percent = 0.20;
    } else if (this.operator === 'support' && this.client === 'agro') {
      percent = 0.60;
    } else if (this.operator === 'frustration' && this.client === 'agro') {
      percent = 0.40;
    }
    if (percent !== 0) {
      var map = function(v) {
        return {key: v.key, value: Math.round(v.value * percent)};
      };
      this.$char.event('change-mind-cube', {operations: this.$rootScope.changed.map(map).map(this.mindAction).join(',')}, this.$rootScope.creds.operator);
      this.$state.go('init');
    } else {
      this.$state.go('init');
    }
  }
}

export default FeedbackController;
