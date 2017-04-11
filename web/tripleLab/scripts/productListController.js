app.controller('productListController', function ($scope, $http, $routeParams) {
    
    // main code for this controller
    console.log("productListController" + $routeParams);

    if ($routeParams.productId) {
        console.log("First I will delete product " + $routeParams.productId);
        deleteProduct($routeParams.productId);
    } else {
        console.log("Listing products without deleting first.");
    }
    getProductList();


    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    function getProductList() {
        $http.get('apis/getProductList.jsp').then(
                function (response) { // what to do if success
                    //console.log("ajax success");
                    console.log(response);
                    console.log("");
                    $scope.products = response.data.recordList;
                    $scope.dbError = response.data.dbError;
                    //console.log($scope.products);
                },
                function (response) { // what to do if error
                    console.log("ajax error");
                    console.log(response);
                    console.log("");
                }
        );
    }


    //$scope.sortField = 'productName';
    //$scope.reverse = true;

    function deleteProduct(id) {
        var url = "apis/deleteProduct.jsp?id=" + id;
        console.log("urlin deleteProduct function in controller: " + url);
        $scope.deleteMsg = "";

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Product Delete ajax success. response: " + response);
                    $scope.deleteMsg = response.data.errorMsg;
                    if ($scope.deleteMsg.length === 0) {
                        $scope.deleteMsg = "Sucessfully deleted product " + id;
                    } else {
                        $scope.deleteMsg = "error deleting product in list controller: " + $scope.deleteMsg;
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Product Delete ajax error" + response);
                    $scope.deleteMsg = "ajax error deleting product in list controller " + response.status + " " + response.statusText;

                }
        );
        window.location = "index.html";
    }
});