app.controller('productUpdateController', function ($scope, $http, $routeParams) {
    $scope.pageTitle = "Update";
    $scope.isUpdateMode = true;
    $scope.isInsertMode = false;

    console.log("productUpdateController");
    console.log($routeParams);
    $scope.productId = $routeParams.productId;

    var url = "apis/productJson.jsp?id=" + $routeParams.productId;
    $http.get(url).then(
            function (response) {
                console.log("Product Update (get) ajax success", response);
                $scope.product = response.data;
                $scope.product.price = formatPrice($scope.product.price);
                $scope.product.productId = $routeParams.productId;
                $scope.errorMsg = "";
            },
            function (response) {
                console.log("Product Update (get) ajax error", response);
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;

            }
    );

    $scope.updateProduct = function () {
        validatePrice();
        console.log("$scope.product.price after validate: ", $scope.product.price)
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
    function formatPrice(price) {
        if (price.charAt(0) === '$') {
            price = price.substr(1);
        }
        return price;
    }

    function validatePrice() {
        console.log("in validatee price with price: ", $scope.product.price);
        if ($scope.product.price ==- null || $scope.product.price === "") {
            $scope.product.price = "0.0";
        }
    }

});