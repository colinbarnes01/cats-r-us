app.controller('productInsertController', function ($scope, $http) {
    $scope.product = {};
    $scope.pageTitle = "Insert";
    $scope.isUpdateMode = false;
    $scope.isInsertMode = true;

    $scope.insertProduct = function () {
        console.log("in insertproduct function");
        console.log($scope.product);

        var jsonData = JSON.stringify($scope.product);
        console.log(jsonData);

        var url = "apis/insertProduct.jsp?jsonData=" + jsonData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Person Insert/Save ajax success, response: ", response);
                    $scope.response = response.data;
                    $scope.status = response.data.errorMsg;
                    console.log('$scope.status after successful ajax call: ' + $scope.status);
                    if ($scope.status.length == 0) {
                        $scope.status = "Product Sucessfully Inserted";
                    }
                    //console.log('$scope.status after successful ajax call: ');
                    //console.log($scope.status);
                },
                function (response) { // this function will run if http.get error
                    console.log("Products Insert/Save ajax error");
                    console.log(response + "");
                    $scope.status = "Error: " + response.status + " " + response.statusText;    
                }

        );
    };
});
