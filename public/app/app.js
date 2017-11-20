var app = angular.module('nlApp', ['ngRoute', 'app.controller']);


app.config(function ($routeProvider, $locationProvider) {

  $routeProvider

    .when('/search', {
      templateUrl: 'app/views/templates/search.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })

    .when('/classify', {
      templateUrl: 'app/views/templates/classifier.html',
      controller: 'ClassifyController',
      controllerAs: 'classifyCtrl'
    })

    // catch all to redirect to home page            
    .otherwise({
      redirectTo: '/classify'
    });

  // Required for no base (remove '#' from address bar)
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
