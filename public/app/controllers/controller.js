angular.module('app.controller', ['app.service'])

  .controller('MyController', ['$scope', 'MyService', function ($scope, MyService) {

    console.log('controller init');

    $scope.classificationResult = '';

    MyService.callAPI().then(resp => console.log(resp));

    $scope.classifyText = function (text) {
      $scope.classificatonResult = '';
      MyService.classifyText(text)
        .then(resp => {
          if (resp.data.success) {
            console.log(resp);
            $scope.classificationResult = resp.data.result;
          } else $scope.classificationResult = 'Resule Unavailable';
        })
        .catch(err => console.log(err));
    }
}]);
