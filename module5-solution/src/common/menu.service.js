(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  // service.getCategories = function () {
  //   return $http.get(ApiPath + '/categories.json').then(function (response) {
  //     return response.data;
  //   });
  // };


  // service.getMenuItems = function (category) {
  //   var config = {};
  //   if (category) {
  //     config.params = {'category': category};
  //   }
  //
  //   return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
  //     return response.data;
  //   });
  // };

  service.getMenuItem = function (menuItemShortName) {
    // var config = {};
    // if (menuItemShortName) {
    //   config.params = {'short_name': menuItemShortName};
    // }

    //return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
    return $http.get(ApiPath + '/menu_items/' + menuItemShortName +'.json').then(function (response) {
      console.log("Menu Item data from service =", response.data);
      console.log("Response from service =", response);
      return response.data;
    }
    // ,
    // function (error) {
    //   console.log("Menu Item data from service error =", error);
    //   return error; // .data
    // }
    );
  };

}



})();
