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
            .when("/insertUser", {
                templateUrl: "partialHTMLPages/insertUser.html",
                controller: "userInsertController"
            })
            .when("/insertProduct", {
                templateUrl: "partialHTMLPages/insertUpdateProduct.html",
                controller: "productInsertController"
            })
            .when('/update/:productId', {
                templateUrl: 'partialHTMLPages/insertUpdateProduct.html',
                controller: 'productUpdateController'
            })
            .when('/delete/:productId', {
                templateUrl: "partialHTMLPages/productList.html",
                controller: "productListController"
            })
            .when('/show/:productId', {
                templateUrl: 'partialHTMLPages/productDetail.html',
                controller: 'productDetailController'
            })
            .when('/logOn/', {
                templateUrl: 'partialHTMLPages/logOn.html',
                controller: 'logOnController'
            })
            .when('/logOff/', {
                templateUrl: "partialHTMLPages/logOff.html",
                controller: 'logOffController'
            })
            .otherwise({
                redirectTo: "partialHTMLPages/productList.html"
            });
});



