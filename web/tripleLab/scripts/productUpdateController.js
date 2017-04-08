app.controller('productUpdateController', function ($scope, $http, $routeParams) {
    $scope.pageTitle = "Update";
    $scope.isUpdateMode = true;
    $scope.isInsertMode = false;

    console.log("productUpdateController");
    console.log($routeParams);
    $scope.productId = $routeParams.productId;

    // blank out the new product in case the ajax get fails to populate product
    //$scope.product = SkService.emptyProduct();
    // blank out error message object
    //$scope.myErrors = SkService.emptyProduct();

    var url = "apis/productJson.jsp?id=" + $routeParams.productId;
    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Product Update (get) ajax success");
                console.log(response);
                console.log("");
                $scope.product = response.data;
                $scope.product.productId = $routeParams.productId;
                //$scope.responseErrors = response.data;  // i added this
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("Product Update (get) ajax error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;

            }
    );

    $scope.updateProduct = function () {

        // empty out all the field level user error messages in case of an ajax error 
        //$scope.myErrors = SkService.emptyProduct();

        var myData = JSON.stringify($scope.product);
        console.log('myData in updateProduct(): ');
        console.log(myData);
        var url = "apis/updateProduct.jsp?jsonData=" + myData;
        console.log('url: ' + url);

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Product Update/Save ajax success");
                    console.log(response);
                    console.log("");
                    $scope.responseErrors = response.data;
                    $scope.status = $scope.responseErrors.errorMsg;
                    if ($scope.status.length === 0) {
                        $scope.status = "Product Sucessfully Updated";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Product Update/Save ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn
        ); // closes off "then" function call
    };

});