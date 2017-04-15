app.controller('logonController', function ($scope, $http) {


    $scope.user = {};
    console.log("inside logonController");


    $scope.logon = function () {
        console.log('user', $scope.user.email);
        console.log($scope.user.email);
        console.log($scope.user.password);
        var url = "apis/logon.jsp?email=" + $scope.user.email + "&password=" + $scope.user.password;
        console.log('calling logon.jsp with url: ', url);

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("logon GET ajax success", response);
                    $scope.errorMsg = response.data.errorMsg;
                },
                function (response) { // this function will run if http.get error
                    console.log("logon GET ajax error", response);
                    $scope.errorMsg = response.data.errorMsg;
                }
        );
    };


});