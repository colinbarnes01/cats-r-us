app.controller('logOnController', function ($scope, $http) {


    $scope.user = {};
    console.log("inside logOnController");


    $scope.logOn = function () {
        console.log('user', $scope.user.email);
        console.log($scope.user.email);
        console.log($scope.user.password);
        var url = "apis/logOn.jsp?email=" + $scope.user.email + "&password=" + $scope.user.password;
        console.log('calling logOn.jsp with url: ', url);

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("logOn GET ajax success", response);
                    $scope.userName = response.data.userName;
                    $scope.welcomeMsg = response.data.errorMsg;
                    if ($scope.welcomeMsg.length == 0) {
                        $scope.welcomeMsg = "Login successful, welcome " + $scope.userName;
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("logOn GET ajax error", response);
                }
        );
    };
});