(function () {
"use strict";

angular.module('public')
.service('SignupService', SignupService);

function SignupService() {
  var service = this;
  service.userSignupInfo = {};

  service.saveUserInfo = function (userInfo, favMenuItem) {
      console.log("Saving User Signup Info =", userInfo);
      service.userSignupInfo = userInfo;
      service.userSignupInfo.favMenuItemData = favMenuItem;
  };

  service.getUserInfo = function () {
      console.log("Returing User Signup Info =", service.userSignupInfo);
      return service.userSignupInfo;
  };

  service.clearUserInfo = function(){
    service.userSignupInfo = {};
  }

}



})();
