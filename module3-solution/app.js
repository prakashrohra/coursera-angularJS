(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuSearchService', MenuSearchService)
.controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
//.filter('highlight', HighlightFilter)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      searchTerm:'@searchTerm',
      items: '<',
      notFoundMessage: '@notFoundMessage',
      onRemove: '&'
    },
    controller: 'FoundItemsDirectiveController as foundItemsListCtrl',
    bindToController: true
  };

  return ddo;
}

//FoundItemsDirectiveController.$inject = ['highlightFilter'];
function FoundItemsDirectiveController(){
  var foundItemsListCtrl = this;
}

NarrowItDownController.$inject =  ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowItDownCtrl = this;
  narrowItDownCtrl.notFoundMessage = "";
  narrowItDownCtrl.searchTerm = "";

  narrowItDownCtrl.found = [];

  narrowItDownCtrl.narrowItDown = function(){
    narrowItDownCtrl.notFoundMessage = "";
    console.log("search term =", narrowItDownCtrl.searchTerm);
    if(narrowItDownCtrl.searchTerm === undefined || narrowItDownCtrl.searchTerm.length === 0){
      narrowItDownCtrl.notFoundMessage = "Nothing found";
      console.log("Search Item is empty. Returning empty foundItems list");
      narrowItDownCtrl.found = [];
      return;
    }


    var promise = MenuSearchService.getMatchedMenuItems(narrowItDownCtrl.searchTerm);
    promise.then(function(result){
      narrowItDownCtrl.found = result;
      console.log("Response from search service ", narrowItDownCtrl.found);
      if(narrowItDownCtrl.found.length === 0){
        narrowItDownCtrl.notFoundMessage = "Nothing found";
        console.log("Nothing found");
      }
      else{
        console.log("found ", narrowItDownCtrl.found.length, "# of items");
      }
    })
    .catch(function(error){
      console.log(error);
    })

  };

  narrowItDownCtrl.removeItem = function(itemIndex){
    narrowItDownCtrl.found.splice(itemIndex, 1);
  };
}


 MenuSearchService.$inject = ['$http', 'ApiBasePath'];
 function MenuSearchService($http, ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function (searchTerm){
    service.foundItems = [];
    console.log("Searching for ", searchTerm);
      console.log("calling Http service for Searching ", searchTerm);
      //call $http service and narrow down the results
      return $http({method:"GET",
             url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
            // process result and only keep items that match
            //var foundItems = [];
            console.log("Data:", result.data);
            for (var i = 0; i < result.data.menu_items.length; i++) {
              var description = result.data.menu_items[i].description;
              //console.log("Mathching Item Description:", description);
              if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                //console.log("Menu Item Matched!!!. Adding to list :", result.data.menu_items[i] );
                service.foundItems.push(result.data.menu_items[i]);
              }
            }

            // return processed items
            console.log("Matched ", service.foundItems.length, "# of items");
            return service.foundItems;
        });

    return service.foundItems;
  };
}

// function HighlightFilter() {
//   return function (input, target) {
//     input = input || "";
//     input = input.replace(target, "<b><u>" + target + "</u></b>");
//     return input;
//   }
// }

})();
