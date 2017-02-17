angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider){

    $routeProvider
    
    .when('/',{
        templateUrl: 'app/views/pages/home.html'
    })
    
    .when('/about',{
        templateUrl: 'app/views/pages/about.html'
    })
    .otherwise({redirectTo:'/'});
});