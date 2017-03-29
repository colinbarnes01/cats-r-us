var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                template: "Welcome User!"
            })
            .when("/user", {
                //template: "london!"
                templateUrl: "partialHTMLPages/london.html",
                controller: "userController"
            })
            .when("/other", {
                //template: "paris!"
                templateUrl: "partialHTMLPages/otherList.html",
                controller: "otherController"
            })
            .otherwise({
                redirectTo: '/'
            });
});

app.controller('otherController', function ($scope, $http) {

    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('apis/getProductList.jsp').then(
            function (response) { // what to do if success
                //console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.products = response.data.recordList;
                //console.log($scope.persons);
            },
            function (response) { // what to do if error
                console.log("ajax error");
                console.log(response);
                console.log("");
            }
    ); // closes off the parameter list to the "then" function...
}); // finishes fn def'n for unnamed controller of 'ContryListCtrl' ng-controller element.

app.controller('userController', function ($scope, $http) {

    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('apis/getUserList.jsp').then(
            function (response) { // what to do if success
                //console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.users = response.data.recordList;
                //console.log($scope.persons);
            },
            function (response) { // what to do if error
                console.log("ajax error");
                console.log(response);
                console.log("");
            }
    ); // closes off the parameter list to the "then" function...
}); // finishes fn def'n for unnamed controller of 'ContryListCtrl' ng-controller element.