angular.module('london_app')
.controller('allPointsofInterstController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
    let self = this;
    self.selection = {};

     self.picChange = function(pic) {
        if(pic == 'heartreg.png'){
            self.photo = 'heartfav.png'
        }else{
            self.photo = 'heartreg.png'
        }
 };


    $http.get('http://localhost:3000/user/poi/getAll_POI')
    .then(
        function (response) {
        let data = response.data
        $rootScope.allPois = data;
        },
        function (error) {

        })
        
}]);
    //allPointsofInterstController as allPOICtrl