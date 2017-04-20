app.controller('productListController', function ($scope, $http, $routeParams) {
    console.log("productListController" + $routeParams);
    $scope.logOnStatus;

    // main controller code
    if ($routeParams.productId) {
        console.log("First I will delete product " + $routeParams.productId);
        deleteProduct($routeParams.productId);
    } else {
        console.log("Listing products without deleting first.");
    }
    getProductList();

    function getProductList() {
        $http.get('apis/getProductList.jsp').then(
                function (response) {
                    console.log("ajax success with response: ", response);
                    $scope.products = response.data.recordList;
                    $scope.dbError = response.data.dbError;
                    $scope.logOnMsg = $scope.products[$scope.products.length - 1].errorMsg;
                    console.log("$scope.logOnMsg: " + $scope.logOnMsg);
                    updateLogOnStatusIfNecessary($scope.logOnMsg);
                },
                function (response) {
                    console.log("ajax error with response: ", response);
                }
        );
    }

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
                        window.location = "index.html";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Product Delete ajax error" + response);
                    $scope.deleteMsg = "ajax error deleting product in list controller " + response.status + " " + response.statusText;
                }
        );
    }

    function isLoggedOn() {
        return $scope.logOnStatus;
    }

    function updateLogOnStatusIfNecessary(logOnMsg) {
        if (logOnMsg === "LOG ON ERROR") {
            $scope.logOnStatus = false;
        } else {
            $scope.logOnStatus = true;
        }
        console.log("$scope.logOnStatus", $scope.logOnStatus);
    }
});