angular.module('london_app')
	.controller('homeUserController', ['$rootScope', '$scope', '$http', 'ModalService', function ($rootScope, $scope, $http, ModalService) {
		let self = this

		if ($rootScope.isLoggedIn) {
			$http.get(`http://localhost:3000/guest/userRecommended_POIs/${$rootScope.loggedUser}`, $rootScope.tokenHeaderConfig($rootScope.loggedUser))
				.then(
					function (response) {
						for (let i = 0; i < 2; i++) {
							if (i === 0) { self.rcmndPOI0 = response.data[i] }
							else { self.rcmndPOI1 = response.data[i] }

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

							if (i === 0) poiCell.setAttribute("ng-click", "homeUserCtrl.open(homeUserCtrl.rcmndPOI0)")
							else poiCell.setAttribute("ng-click", "homeUserCtrl.open(homeUserCtrl.rcmndPOI1)")

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
							for (let i = 0; i < 2; i++) {
								if (i === 0) { self.rcntPOI0 = response.data[i] }
								else { self.rcntPOI1 = response.data[i] }

								let td = document.createElement('td')
								let label = document.createElement('label')
								let text = document.createTextNode(response.data[i].name)
								label.appendChild(text)
								td.appendChild(label)
								let img = document.createElement('img')
								img.src = response.data[i].picture
								img.height = "250"
								img.width = "400"
								td.appendChild(img)
								td.insertBefore(document.createElement('br'), img)
								if(i===0) {td.setAttribute("ng-click", "homeUserCtrl.open(homeUserCtrl.rcntPOI0)")}
								else {td.setAttribute("ng-click", "homeUserCtrl.open(homeUserCtrl.rcntPOI1)")}
								row.appendChild(td)
								$rootScope.recompile(td)
							}
						}
					},
					function (error) {
						alert('Illegal token - you are not authorized!')
						$rootScope.logout()
					}
				)
		}

		self.open = function (poi) {
			if (!ModalService.isOpen)
				ModalService.open(poi);
		}
	}])