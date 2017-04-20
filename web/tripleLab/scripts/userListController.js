app.controller('userListController', function ($scope, $http) {
    console.log("inside userListController function");
    $scope.logOnStatus;

    $http.get('apis/getUserList.jsp').then(
            function (response) {
                console.log("ajax success with response: ", response);
                $scope.users = response.data.recordList;
                $scope.dbError = response.data.dbError;
                $scope.logOnMsg = $scope.users[$scope.users.length - 1].errorMsg;
                console.log("$scope.logOnMsg: " + $scope.logOnMsg);
                updateLogOnStatusIfNecessary($scope.logOnMsg);
            },
            function (response) {
                console.log("ajax error with response: ", response);
            }
    );

    function updateLogOnStatusIfNecessary(logOnMsg) {
        if (logOnMsg === "LOG ON ERROR") {
            $scope.logOnStatus = false;
        } else {
            $scope.logOnStatus = true;
        }
        console.log("$scope.logOnStatus", $scope.logOnStatus);
    }

});