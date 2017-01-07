(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject =  ['$scope'];
function LunchCheckController ($scope) {
  $scope.lunchMenu = "";
  $scope.message = ""; //"Enjoy!" or "Too much!" or "Please enter data first"

  $scope.checkMyLunch = function(){
    $scope.message = "";
    if ($scope.lunchMenu.length == 0){
      $scope.message = "Please enter data first";
    }else{

      var lunchItems = $scope.lunchMenu.split(",");
      
      console.log("#Items=", lunchItems.length);
      console.log("Items=", lunchItems);

      if(lunchItems.length <= 3){
          $scope.message = "Enjoy!";
      }
      else{
        $scope.message = "Too much!";
      }
    }


  }
}

})();
