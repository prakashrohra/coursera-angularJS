(function () {
"use strict";

angular.module('public')
.controller('SignupFormController', SignupFormController);

SignupFormController.$inject = ['MenuService', 'SignupService']; //inject some service that will store data
function SignupFormController(MenuService, SignupService) {
  var $ctrl = this;

  $ctrl.submit = function () {
    $ctrl.successMsg = "";
    $ctrl.menuNotFoundMsg = "";
    $ctrl.completed = true;
    MenuService.getMenuItem($ctrl.user.favmenuitem).then(function(menuItemData){
      //save data in a Singleton Service
      $ctrl.favMenuItem = menuItemData;
      SignupService.saveUserInfo($ctrl.user, $ctrl.favMenuItem);
      $ctrl.successMsg = 'Your information has been saved';
    }, function(error){
      $ctrl.menuNotFoundMsg = 'No such menu number exists';
      //SignupService.clearUserInfo();
    });

    $ctrl.getUserSignupInfo = function() {
      return SignupService.getUserInfo();
    };

  };
}

})();
