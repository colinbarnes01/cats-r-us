app.controller('userInsertController', function ($scope, $http) {

    $scope.user = {};

    $scope.insertUser = function () {
        console.log("in insertUser function");
        console.log($scope.user);

        var jsonData = JSON.stringify($scope.user);
        console.log(jsonData);
        
        var url = "apis/insertUser.jsp?jsonData=" + jsonData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Person Insert/Save ajax success");
                    console.log(response);
                    console.log("");
                    $scope.responseErrors = response.data;
                    console.log('responseErrors:' + $scope.responseErrors);
                    $scope.status = $scope.responseErrors.errorMsg;
                    console.log('$scope.status after successful ajax call: ' + $scope.status);
                    if ($scope.responseErrors.errorMsg.length === 0) {
                        $scope.status = "Person Sucessfully Inserted";
                    } else {
                        $scope.status = "ERRORS trying to insert user in controller: insertUser() function";
                    }
                    //console.log('$scope.status after successful ajax call: ');
                    //console.log($scope.status);
                },
                function (response) { // this function will run if http.get error
                    console.log("Person Insert/Save ajax error");
                    console.log(response + "");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                }

        );
    };

});