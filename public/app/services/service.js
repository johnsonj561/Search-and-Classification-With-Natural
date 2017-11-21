angular.module('app.service', [])

  .service('MyService', ['$http', function ($http) {


    function classifyText(url) {
      return $http.post('/api/classification', {
        url: url
      });
    }


    function addDocument(url) {
      return $http.post('/api/document', {
        url: url
      });
    }


    function queryCollection(query) {
      return $http.get('api/search/' + query);
    }


    return {
      classifyText,
      addDocument,
      queryCollection
    }

      }]);
