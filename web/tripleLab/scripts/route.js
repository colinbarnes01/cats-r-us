var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "partialHTMLPages/productList.html",
                controller: "productListController"
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
            .when("/insertProduct", {
                templateUrl: "partialHTMLPages/insertProduct.html",
                controller: "productInsertController"
            })
            .otherwise({
                redirectTo: '/'
            });
});




