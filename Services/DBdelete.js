angular.module('london_app')
    .service('RemoveDBFavourite', ['$http', '$rootScope', '$httpParamSerializerJQLike', 'tokenStorage',
        function ($http, $rootScope, $httpParamSerializerJQLike, tokenStorage) {
            let self = this

            self.delete = function (favPoi) {
                $http.delete('http://localhost:3000/user/poi/removeFavouritePOI', {
                    data: $httpParamSerializerJQLike({
                        username: $rootScope.loggedUser,
                        poi_name: favPoi.FK_poi_name
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${tokenStorage.getUserToken(favPoi.FK_username)}`
                    }
                })
                    .then(
                        function (response) {
                            if (response.data.ans) {
                                console.log(`${favPoi.FK_poi_name} deleted`)
                            } else {
                                alert('ERROR_POI_NOT_DELETED')
                            }
                        },

                        function (error) {
                            console.log(error.data)
                        }
                    )
            }
        }])