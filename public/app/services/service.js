angular.module('app.service', [])

  .service('MyService', ['$http', function ($http) {

    function classifyText(url) {
      console.log('\ncalling $http');
      return $http.post('/api/classify', {
        url: url
      });
    }


    function addDocument(url) {
      return $http.post('/api/document', {
        url: url
      });
    }


    function queryCollection(query) {
      return $http.post('/api/search', {
        query: query
      });
    }


    return {
      classifyText,
      addDocument,
      queryCollection
    }

}]);
