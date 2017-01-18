(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      notFoundMessage: '@notFoundMessage',
      //notFoundMsg:'&',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'ctrl',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject =  ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowItDownCtrl = this;
  narrowItDownCtrl.notFoundMessage = "";
  narrowItDownCtrl.searchTerm = "";

  narrowItDownCtrl.found = [];

  // narrowItDownCtrl.notFoundMsg = function(){
  //   return narrowItDownCtrl.notFoundMessage;
  // }

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
  //service.foundItems = [];

  service.getMatchedMenuItems = function (searchTerm){
    service.foundItems = [];
    console.log("Searching for ", searchTerm);
    // if(searchTerm === undefined || searchTerm.length === 0){
    //   console.log("Search Item is empty. Returning empty foundItems list");
    //   service.foundItems = [];
    //   return service.foundItems;
    // }
    // else{
      console.log("calling Http service for Searching ", searchTerm);
      //call $http service and narrow down the results
      return $http({method:"GET",
             url: ("http://davids-restaurant.herokuapp.com/menu_items.json")
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

    //}
    return service.foundItems;
  };

}

})();
