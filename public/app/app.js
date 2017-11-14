var app = angular.module('nlApp', ['ngRoute', 'app.controller']);


app.config(function ($routeProvider, $locationProvider) {

  $routeProvider

    // Home Route    
    .when('/', {
      templateUrl: 'app/views/templates/home.html',
      controller: 'MyController',
      controllerAs: 'myCtrl',
    })


    // catch all to redirect to home page            
    .otherwise({
      redirectTo: '/'
    });

  // Required for no base (remove '#' from address bar)
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
