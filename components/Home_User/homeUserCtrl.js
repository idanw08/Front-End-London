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

			//return the 2 most recent saves
			$http.get(`http://localhost:3000/guest/userRecentSaves/${$rootScope.loggedUser}`, $rootScope.tokenHeaderConfig($rootScope.loggedUser))
				.then(
					function (response) {
						let row = document.getElementById('rsRow')
						let lclFavs = []
						$rootScope.userFavs.forEach(e => {
							if (!e.DB) { 
								// lclFavs.push($rootScope.allPois.filter(p => p.name===e.FK_poi_name)[0]) 
								lclFavs.push(e) 
							}
						})
						// console.log('response.data', response.data);
						// console.log('lclFavs',lclFavs);
						if (response.data.length === 0 && lclFavs.length == 0) {
							console.log('0-0')
							let cell = row.insertCell(0)
							cell.innerHTML = 'YOU DID NOT SAVE ANY FAVOURITE POINTS IN LONDON!'
							cell.colSpan = 2
						}
						else if (response.data.length === 0 && lclFavs.length === 1) {
							console.log('0-1')
							self.rcntPOI0 = lclFavs[0]
							createTD(lclFavs[0], 0)
						}
						else if (response.data.length >= 1 && lclFavs.length === 1) {
							console.log('1-1')
							// console.log(response.data);
							// console.log(response.data);
							self.rcntPOI0 = response.data[0]
							self.rcntPOI1 = lclFavs[0]
							createTD(response.data[0], 0)
							createTD(lclFavs[0], 1)
						}
						else if (response.data.length === 1 && lclFavs.length === 0) {
							console.log('1-0')
							self.rcntPOI0 = response.data[0]
							createTD(response.data[0], 0)
						}

						else if (response.data.length > 1 && lclFavs.length === 0) {
							console.log('>1-0')
							self.rcntPOI0 = response.data[0]
							self.rcntPOI1 = response.data[1]
							createTD(response.data[0], 0)
							createTD(response.data[1], 1)
						}
						else {
							console.log('* - >1')
							let ans = local2RecentSaves(lclFavs)	
							console.log('ans', ans);
							self.rcntPOI0 = $rootScope.allPois.filter(p => p.name === ans[0].FK_poi_name)[0]
							self.rcntPOI1 = $rootScope.allPois.filter(p => p.name === ans[1].FK_poi_name)[0]
							// console.log('rcntPOI0', self.rcntPOI0);
							// console.log('rcntPOI1', self.rcntPOI1);
							createTD(self.rcntPOI0, 0)
							createTD(self.rcntPOI1, 1)
						}
					},
					function (error) {
						alert('Illegal token - you are not authorized!')
						$rootScope.logout()
					}
				)
		}

		function createTD(data, i) {
			// console.log('createTD data:',data)
			let td = document.createElement('td')
			let label = document.createElement('label')
			let text
			if (data.name)
				text = document.createTextNode(data.name)
			else
				text = document.createTextNode(data.FK_poi_name)
			label.appendChild(text)
			td.appendChild(label)
			let img = document.createElement('img')
			if (data.picture)
				img.src = data.picture
			else
				img.src = data.img
			img.height = "250"
			img.width = "400"
			td.appendChild(img)
			td.insertBefore(document.createElement('br'), img)
			td.setAttribute("ng-click", `homeUserCtrl.open(homeUserCtrl.rcntPOI${i})`)
			document.getElementById('rsRow').appendChild(td)
			$rootScope.recompile(td)
		}

		self.open = function (poi) {
			if (!ModalService.isOpen)
				ModalService.open(poi);
		}

		function local2RecentSaves(arr) {
			let ans1, ans2
			let time1 = '0000-01-01 00:01:01.111'
			arr.forEach(element => {
				if (element._time_date > time1) {
					time1 = element._time_date
					ans1 = element
				}
			})

			let time2 = '0000-01-01 00:01:01.111'
			arr.forEach(element => {
				if (element._time_date !== time1 && element._time_date > time2) {
					time2 = element._time_date
					ans2 = element
				}
			});

			return time2 === '0000-01-01 00:01:01.111' ? [ans1] : [ans1, ans2]
		}
	}])