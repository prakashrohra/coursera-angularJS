(function () {
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['myinfo'];
function MyInfoController(myinfo) {
  var myInfoCtrl = this;
  console.log("Ctrl injected User Info", myinfo);
  myInfoCtrl.myinfo = myinfo;
}

})();
