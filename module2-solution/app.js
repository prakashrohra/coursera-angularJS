(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject =  ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuyCtrl = this;

  toBuyCtrl.toBuyList = ShoppingListCheckOffService.toBuyItems();

  toBuyCtrl.checkOffItemBought = function(itemIndex){
    ShoppingListCheckOffService.checkOffItemBought(itemIndex);
  }
}

AlreadyBoughtController.$inject =  ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBoughtCtrl = this;
  alreadyBoughtCtrl.boughtItemsList = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService(){
  var service = this;

  var toBuyItemsOrig = [
    {
      name: "cookies", quantity: 10
    },
    {
      name: "gummies", quantity: 5
    },
    {
      name: "apples", quantity: 4
    },
    {
      name: "oranges", quantity: 6
    },
    {
      name: "chips", quantity: 5
    },

    {
      name: "soda", quantity: 2
    }
  ];

  var toBuyItemsCurrent = toBuyItemsOrig;

  var checkedOffBoughtItems = [];

  service.checkOffItemBought = function(itemIndex){
    //console.log("Checking off bought item at index =", itemIndex);
    var boughtItem = toBuyItemsCurrent.splice(itemIndex, 1);
    //console.log("Removed Item =", boughtItem);
    checkedOffBoughtItems.push(boughtItem[0]);
    //console.log("Adding item to checkedOffBoughtItems. New size is=", checkedOffBoughtItems.length);
    //console.log ("Bought Item List =", checkedOffBoughtItems);
  };

  service.toBuyItems = function(){
    return toBuyItemsCurrent;
  };

  service.getBoughtItems = function() {
      //console.log("Bought Items =", checkedOffBoughtItems);
      return checkedOffBoughtItems;
  };
}

})();
