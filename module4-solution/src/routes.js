(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Menu Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'MainCategoriesController as mainlist',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categories.items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menuapp/templates/main-items.template.html',
    controller: "ItemsController as itemsCtrl",
    resolve: {
      // 'items' contains both 'category' and list of 'menu_items'
      items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        console.log("$stateParams = ", $stateParams);
        return MenuDataService.getItemsForCategory($stateParams);
      }]

    }
  })
  ;

}

})();
