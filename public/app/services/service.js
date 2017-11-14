angular.module('app.service', [])

  .service('MyService', ['$http', function ($http) {


    function callAPI() {
      return $http.get('/api/');
    };

    function classifyText(url) {
      console.log('\ncalling $http');
      return $http.post('/api/classify', {
        url: url
      });
    };

    return {
      callAPI,
      classifyText
    }

}]);
