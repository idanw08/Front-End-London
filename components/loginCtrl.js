angular.module('london_app')
	.controller('loginController', ['$scope', '$rootScope', '$http', '$location', '$httpParamSerializerJQLike', 'tokenStorage',
		function ($scope, $rootScope, $http, $location, $httpParamSerializerJQLike, tokenStorage) {
			let self = this;

			self.sumbitLogin = function () {
				$http.post('http://localhost:3000/auth/login', $httpParamSerializerJQLike(self.user), $rootScope.config)
					.then(function (response) {
						const data = response.data;
						if (data.status === 403) {
							alert('username or password incorrect!');
							return
						}
						if (!data.token) {
							console.log('missing user\'s token')
							return
						}
						tokenStorage.addUserToken(self.user.username, data.token) //saves the token in localstorage
						$rootScope.loggedUser = self.user.username
						$location.path('/homeUser')
					},
						function (response) {
							alert('Error.')
						}
					)
			}
		}]);