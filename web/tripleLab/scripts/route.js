var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                template: "Welcome User!"
            })
            .when("/user", {
                templateUrl: "partialHTMLPages/userList.html",
                controller: "userListController"
            })
            .when("/product", {
                templateUrl: "partialHTMLPages/productList.html",
                controller: "productListController"
            })
            .when("/insertUser", {
                templateUrl: "partialHTMLPages/insertUser.html",
                controller: "userInsertController"
            })
            .otherwise({
                redirectTo: '/'
            });
});




