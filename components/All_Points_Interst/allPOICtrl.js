angular.module('london_app')
.controller('allPointsofInterstController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
    let self = this;
    
    $http.get('http://localhost:3000/user/poi/getAll_POI')
    .then(
        function (response) {
        let data = response.data
        $scope.records = data;
        },
        function (error) {

        })
}]);
    //allPointsofInterstController as allPOICtrl