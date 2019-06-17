angular.module('london_app')
	.controller('favouritesController', ['$rootScope', '$http', '$location', '$httpParamSerializerJQLike',
		function ($rootScope, $http, $location, $httpParamSerializerJQLike) {
			let self = this
			
			$http.get("http://localhost:3000/user/getUserFavourites/" + $rootScope.loggedUser, $rootScope.tokenHeaderConfig($rootScope.loggedUser))
				.then(function (response) {
					self.DBfavs = response.data
					console.log(self.DBfavs);
				},
					function (error) { }
				);
		}])