(function () {
'use strict';

angular.module('public')
.component('myinfo', {
  templateUrl: 'src/public/signup/myinfo.template.html',
  bindings: {
    myinfo: '<'
  },
  controller: MyInfoComponentController
});

MyInfoComponentController.$inject = ['ApiPath'];
function MyInfoComponentController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
}

})();
