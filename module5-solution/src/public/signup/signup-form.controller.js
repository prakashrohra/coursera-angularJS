(function () {
"use strict";

angular.module('public')
.controller('SignupFormController', SignupFormController);

SignupFormController.$inject = ['MenuService', 'SignupService']; //inject some service that will store data
function SignupFormController(MenuService, SignupService) {
  var $ctrl = this;

  //$ctrl.menuItem = menuItem;

  $ctrl.submit = function () {
    $ctrl.successMsg = "";
    $ctrl.menuNotFoundMsg = "";
    $ctrl.completed = true;
    console.log("Signup Form Submitted..");
    console.log("User data =", $ctrl.user);
    //Retrieve menu item data
    console.log("Retrieving Menu item data for ", $ctrl.user.favmenuitem);
    //var responseData =
    MenuService.getMenuItem($ctrl.user.favmenuitem).then(function(menuItemData){
      //save data in a Singleton Service
      //TODO - check if no errors in the menu data retrieval, then save data
      console.log("Saving User Info.......");
      $ctrl.favMenuItem = menuItemData;
      SignupService.saveUserInfo($ctrl.user, $ctrl.favMenuItem);
      $ctrl.successMsg = 'Your information has been saved';
    }, function(error){
      console.log("--------- Error Status = ", error.status);
      console.log("--------- Error = ", error);
      console.log("Not Saving User Info...");
      $ctrl.menuNotFoundMsg = 'No such menu number exists';
      SignupService.clearUserInfo();
    });

    $ctrl.getUserSignupInfo = function() {
      return SignupService.getUserInfo();
    };

  };
}

})();
