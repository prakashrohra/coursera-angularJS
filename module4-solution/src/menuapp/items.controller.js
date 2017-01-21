(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['$stateParams', 'items'];
function ItemsController($stateParams, items) {
  // injected 'items' contains both 'category' and list of 'menu_items'
  var itemsCtrl = this;
  itemsCtrl.items = items.menu_items;
  itemsCtrl.category = items.category;
  console.log("Menu Items injected in Controller..", items);
  //var item = items[$stateParams.itemId];
  // itemDetail.name = item.name;
  // itemDetail.quantity = item.quantity;
  // itemDetail.description = item.description;
}

})();
