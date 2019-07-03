angular.module('london_app')
    .service('RemoveDBFavourite', ['$http', '$rootScope', '$httpParamSerializerJQLike', 'tokenStorage',
        function ($http, $rootScope, $httpParamSerializerJQLike, tokenStorage) {
            let self = this

            self.delete = function (poi_name) {
                const config = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': `Bearer ${tokenStorage.getUserToken($rootScope.loggedUser)}`
                    }
                  }
                  $http.delete(`http://localhost:3000/user/poi/removeFavouritePOI/${$rootScope.loggedUser}/${poi_name}`, config)
                    .then(
                      function (response) {
                        console.log('deleted successfuly')
                      },
                      function (error) {
                        console.log('Unsuccessful delete', error)
                      }
                    )
            }
        }])