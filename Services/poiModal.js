angular.module('london_app').service('ModalService', ['$rootScope', '$http', '$httpParamSerializerJQLike', function ($rootScope, $http, $httpParamSerializerJQLike) {
    let self = this

    self.isOpen = false
    self.pois = []
    let modal = document.getElementById('modal-dialog')
    let poiName = document.getElementById('poiName')
    let poiDesc = document.getElementById('poiDesc')
    let poiImg = document.getElementById('poiImage')
    self.poiViews = document.getElementById('poiViews')
    self.poiRating = document.getElementById('poiRating')

    self.init = function (pois) {
        self.pois = pois
        console.log('init:', self.pois);
    }

    // open the POI modal dialog. uses timeout because updatePOIview has two callback in it and needs to wait for them to resolve
    self.open = function (poi) {
        let obj = poi.name === 'St. Paul\'s' ? { poi_name: 'St. Paul'+'\'\''+'s' } : { poi_name: poi.name }
        $http.post('http://localhost:3000/guest/poi/addPOIview', $httpParamSerializerJQLike(obj), $rootScope.postConfig)
            .then(function (response) {
                $http.get('http://localhost:3000/user/poi/getAll_POI')
                    .then(
                        function (response) {
                            let data = response.data
                            $rootScope.allPois = data;

                            for (let i = 0; i < $rootScope.allPois.length; i++) {
                                if ($rootScope.allPois[i].name === poi.name) {
                                    poi = $rootScope.allPois[i]
                                    break
                                }
                            }
                            poiImg.src = poi.picture
                            poiName.innerHTML = poi.name
                            poiDesc.innerHTML = poi.poiDescription
                            self.poiViews.innerHTML = poi.numViews
                            self.poiRating.innerHTML = poi.poiRank
                            document.body.style = "background-color: rgba(0,0,0,0.4);"
                            modal.style = "display: unset;"
                            self.isOpen = true
                        },
                        function (error) { }
                    )
            }, function (error) { })
    }
}])