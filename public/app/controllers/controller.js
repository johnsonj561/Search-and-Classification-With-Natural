angular.module('app.controller', ['app.service'])

  .controller('ClassifyController', ['$scope', 'MyService', function ($scope, MyService) {

    console.log('ClassifyController init');

    angular.element('#nav-search').removeClass('active');
    angular.element('#nav-classifier').addClass('active');

    $scope.classificationResult = '';

    $scope.classifyText = function (text) {
      $scope.classificationResult = false;
      $scope.loading = true;
      MyService.classifyText(text)
        .then(resp => {
          if (resp.data.success) {
            console.log(resp);
            $scope.classificationResult = resp.data.result;
          } else $scope.classificationResult = 'Resule Unavailable';
        })
        .catch(err => console.log(err))
        .finally(() => $scope.loading = false);
    }

    $scope.closeResult = function () {
      $scope.classificationResult = false;
    }
}])

  .controller('SearchController', ['$scope', 'MyService', function ($scope, MyService) {

    console.log('SearchController init');

    angular.element('#nav-search').addClass('active');
    angular.element('#nav-classifier').removeClass('active');

    $scope.queryCollection = function () {
      $scope.error = false;
      if (!$scope.query) {
        $scope.error = 'Invalid Query';
      } else {
        $scope.loading = true;
        MyService.queryCollection($scope.query)
          .then(resp => $scope.results = resp.data.data)
          .catch(err => console.log('Query Error: ', err))
          .then(() => $scope.loading = false);
      }
    }

    $scope.clearSearch = function () {
      $scope.results = [];
      $scope.query = '';
    }


    $scope.indexDocument = function () {
      $scope.error = false;
      if (!$scope.url) {
        $scope.error = 'Invalid URL'
      } else {
        $scope.loading = true;
        MyService.addDocument($scope.url)
          .then(resp => console.log(resp))
          .catch(err => console.log(err))
          .then(() => $scope.loading = false)
          .then(() => $scope.url = '');
      }
    }

}]);
