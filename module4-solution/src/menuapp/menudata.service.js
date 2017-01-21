(function () {
'use strict';

angular.module('data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // Dummy List of menu categories
  // var categories = [];
  //
  // // Pre-populate
  // categories.push({
  //   short_name: "L",
  //   name: "Lunch",
  //   special_instruction: "Lunch Menu Items"
  // });
  // categories.push({
  //   short_name : "D",
  //   name: "Dinner",
  //   special_instruction: "Dinner Menu Items"
  // });

  // List of category items
  // var lunchMenuItems = [];
  //
  // // Pre-populate
  // lunchMenuItems.push({
  //   short_name: "L1",
  //   name: "LunchItem1",
  //   description: "Lunch Menu Items 1"
  // });
  // lunchMenuItems.push({
  //   short_name : "L2",
  //   name: "LunchItem2",
  //   description: "Lunch Menu Items 2"
  // });
  //
  // var dinnerMenuItems = [];
  //
  // // Pre-populate
  // dinnerMenuItems.push({
  //   short_name: "D1",
  //   name: "DinnerItem1",
  //   description: "Dinner Menu Items 1"
  // });
  // dinnerMenuItems.push({
  //   short_name : "D2",
  //   name: "DinnerItem2",
  //   description: "Dinner Menu Items 2"
  // });

  // Returns a promise using REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
  service.getAllCategories = function () {
    console.log("calling Http service for getting menu categories ");

    return $http({method:"GET",
           url: (ApiBasePath + "/categories.json")
         }).then(function (result) {
          console.log("Menu Categories Data:", result.data);
          return result.data;
      });
  };

  /* return a promise which is a result of using the `$http` service, using the
   following REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category=,
   where, before the call to the server, your code should append whatever `categoryShortName`
   value was passed in as an argument into the `getItemsForCategory` method. */
  service.getItemsForCategory = function (params /*categoryShortName*/) {
    var categoryShortName = params.categoryShortName;
    console.log("Looking for menu items for Category: ", categoryShortName);
    return $http({method:"GET",
           url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
         }).then(function (result) {
          console.log(result.data.menu_items.length, "# of Menu Items found. Data:", result.data);
          //return result.data.menu_items;
          return result.data; //contains menu_items and Category information
      });


    // if(categoryShortName === 'L'){
    //   console.log("Returning - ", lunchMenuItems);
    //   return lunchMenuItems;
    // }
    // else if (categoryShortName === 'D'){
    //   console.log("Returning", dinnerMenuItems);
    //   return dinnerMenuItems;
    // }
  };

}

})();
