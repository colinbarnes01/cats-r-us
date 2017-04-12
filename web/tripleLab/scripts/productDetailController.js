
app.controller('productDetailController', function ($scope, $http, $routeParams) {
    console.log("route Params in productDetailController: " + $routeParams.productId);
    $scope.productId = $routeParams.productId;
    var url = "apis/productJson.jsp?id=" + $routeParams.productId;

    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Product Detail ajax success with response: ", response);
                $scope.product = response.data;
                console.log("$scope.product: ", $scope.product)
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("Product Detail ajax error with response: " + response);
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;
            }
    );
});