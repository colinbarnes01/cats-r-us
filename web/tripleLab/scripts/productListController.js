app.controller('productListController', function ($scope, $http) {

    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('apis/getProductList.jsp').then(
            function (response) { // what to do if success
                //console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.products = response.data.recordList;
                $scope.dbError = response.data.dbError;
                //console.log($scope.persons);
            },
            function (response) { // what to do if error
                console.log("ajax error");
                console.log(response);
                console.log("");
            }
    ); // closes off the parameter list to the "then" function...
    //$scope.sortField = 'productName';
    //$scope.reverse = true;
}); // finishes fn def'n for unnamed controller of 'ContryListCtrl' ng-controller element.