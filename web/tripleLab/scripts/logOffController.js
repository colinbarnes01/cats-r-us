app.controller('logOffController', function ($scope, $http) {
    console.log("inside logOffController");

    var url = "apis/logOff.jsp";
    $http.get(url).then(
            function (response) {
                console.log("logOff GET ajax success", response);
                $scope.logOffMsg = response.data.errorMsg;
            },
            function (response) {
                console.log("logOff GET ajax error", response);
            }
    );





});