angular.module('london_app')
    .controller('allPointsofInterstController', ['$scope', '$rootScope', '$http', '$location', 'ModalService', function ($scope, $rootScope, $http, $location, ModalService) {
        let self = this;

        $http.get('http://localhost:3000/user/poi/getAll_POI')
            .then(
                function (response) {
                    let data = response.data
                    $rootScope.allPois = data;
                },
                function (error) {

                })

        self.open = function (poi) {
            if (!ModalService.isOpen)
                ModalService.open(poi);
        }
    }]);