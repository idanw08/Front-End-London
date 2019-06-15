angular.module('london_app')
	.controller('homeUserController', ['$rootScope', '$scope', '$http', 'ModalService', function ($rootScope, $scope, $http, ModalService) {
		let self = this

		if ($rootScope.isLoggedIn) {
			$http.get(`http://localhost:3000/guest/userRecommended_POIs/${$rootScope.loggedUser}`, $rootScope.tokenHeaderConfig($rootScope.loggedUser))
				.then(
					function (response) {
						for (let i = 0; i < 2; i++) {
							let poiCell = document.getElementById(`poi${i}`)
							let poiLabel = document.createElement('label')
							let poiName = document.createTextNode(response.data[i].name)
							poiLabel.appendChild(poiName)
							poiCell.appendChild(poiLabel)
							let poiImage = document.createElement('img')
							poiImage.src = response.data[i].picture
							poiImage.height = '250'
							poiImage.width = '400'
							poiCell.appendChild(poiImage)
							poiCell.insertBefore(document.createElement('br'), poiImage)

							//poiLabel.setAttribute("ng-click", "homeUserCtrl.open()")
							poiCell.setAttribute("ng-click", "homeUserCtrl.open()")
							$rootScope.recompile(poiCell)
						}

					},
					function (error) {
						alert('Illegal token - you are not authorized!')
						$rootScope.logout()
					}
				)

			$http.get(`http://localhost:3000/guest/userRecentSaves/${$rootScope.loggedUser}`, $rootScope.tokenHeaderConfig($rootScope.loggedUser))
				.then(
					function (response) {
						let row = document.getElementById('rsRow')
						if (response.data.length === 0) {
							let label = document.createElement('label')
							let text = document.createTextNode('YOU DID NOT SAVE ANY FAVOURITE POINTS IN LONDON!')
							label.appendChild(text)
							row.appendChild(label)
						} else {
							// TODO: add favourites and check it works correctly!!!
							// TODO: if clicked then display the POI page
							for (let i = 0; i < 2; i++) {
								let td = document.createElement('td')
								let label = document.createElement('label')
								let text = document.createTextNode(response.data[i].name)
								label.appendChild(text)
								td.appendChild(label)
								let img = document.createElement('img')
								img.src = response.data[i].picture
								td.appendChild(img)
								td.insertBefore(document.createElement('br'), img)
								td.setAttribute("ng-click", "homeUserCtrl.ModalService.open()")

								var el = angular.element("modal");
								$scope = el.scope();
								$injector = el.injector();
								$injector.invoke(function ($compile) {
									$compile(el)($scope)
								})

								row.appendChild(td)
							}
						}
					},
					function (error) {
						alert('Illegal token - you are not authorized!')
						$rootScope.logout()
					}
				)
		}

		self.open = function () { ModalService.open(); }
		self.close = function () { ModalService.close() }
	}])