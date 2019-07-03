angular.module('london_app').controller('indexController', ['$rootScope', '$scope', 'tokenStorage', '$location', 'ModalService', '$http', '$httpParamSerializerJQLike', 'RemoveDBFavourite',
	function ($rootScope, $scope, tokenStorage, $location, ModalService, $http, $httpParamSerializerJQLike, RemoveDBFavourite) {
		let self = this
		$rootScope.postConfig = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		self.ModalService = ModalService
		$rootScope.isLoggedIn = false
		$rootScope.loggedUser = 'Guest'
		$rootScope.allPois = []
		$rootScope.userFavs = []

		self.myVar = false
		self.poiName = ''
		self.rev = []

		let XHR = new XMLHttpRequest()
		XHR.open("GET", "countries.xml", true)
		XHR.onload = function () {
			let countries = []
			const doc = XHR.responseXML
			const countriesTags = doc.getElementsByTagName("Countries")[0].getElementsByTagName("Country")
			let tmp = Array.prototype.slice.call(countriesTags, 0)
			for (let i = 0; i < tmp.length; i++) {
				countries.push({
					id: tmp[i].getElementsByTagName("ID")[0].textContent,
					name: tmp[i].getElementsByTagName("Name")[0].textContent
				})
			}
			$rootScope.countries = countries
		}
		XHR.send()

		$http.get("http://localhost:3000/user/poi/getAll_POI").then(
			function (response) {
				let data = response.data;
				$rootScope.allPois = data;
			},
			function (error) { }
		);

		$rootScope.tokenHeaderConfig = function (key) {
			let token = tokenStorage.getUserToken(key)
			return {
				headers: {
					'authorization': `Bearer ${token}`
				}
			}
		}

		$rootScope.logout = function () {
			if (confirm('Are you sure you want to logout?')) {
				tokenStorage.removeUserToken($rootScope.loggedUser)
				$rootScope.isLoggedIn = false
				$rootScope.loggedUser = 'Guest'
				$rootScope.userFavs = []
				$location.path('/')
			}
		}

		$rootScope.recompile = function (elem) {
			var el = angular.element(elem)
			$scope = el.scope();
			$injector = el.injector();
			$injector.invoke(function ($compile) {
				$compile(el)($scope)
			})
		}

		self.closeModal = function () {
			self.poiName = ''
			self.myVar = false
			document.getElementById('modal-dialog').style.display = 'none';
			document.body.style = 'background-color: white';
			ModalService.isOpen = false

		}

		self.toggle = function () {
			self.poiName = ModalService.getPOIname()
			self.myVar = !self.myVar
			document.getElementById('reviewText').value = ''
			document.getElementById('starsForm').reset()
		}

		self.addReview = function (poiName, reviewContent, rankValue) {
			let newReview = {
				poi_name: poiName,
				review_content: reviewContent,
				rankVal: rankValue
			}
			let revConfig = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': `Bearer ${tokenStorage.getUserToken($rootScope.loggedUser)}`
				}
			};
			$http.post('http://localhost:3000/guest/poi/addPOIreview', $httpParamSerializerJQLike(newReview), revConfig)
				.then(
					function (response) {
						console.log('review added.')
						ModalService.open($rootScope.allPois.filter(p => p.name === poiName)[0])
					},
					function (error) {
						console.log('addReviewError', error);
						alert('Error!!.')
					}
				)
		}

		document.onclick = function (e) {
			self.poiName = ModalService.getPOIname()
			let modal = document.getElementById('modal-dialog')
			if (!(e.target === modal || (modal.contains(e.target) && e.target !== document.getElementById('X')))) {
				self.closeModal()
			}
		}

		self.saveInFavLocalList = function () {
			let poi = $rootScope.allPois.filter(p => p.name === ModalService.getPOIname())[0]
			let poiFromFavs = $rootScope.userFavs.filter(value => value.FK_poi_name == poi.name)
			// unliked
			if (poiFromFavs.length > 0) {
				if (poiFromFavs[0].DB) {
					RemoveDBFavourite.delete(poiFromFavs[0].FK_poi_name)
				}
				let i = $rootScope.userFavs.findIndex(x => x.FK_poi_name === poi.name);
				if (i > -1) $rootScope.userFavs.splice(i, 1);
			} else {
				// liked
				$rootScope.userFavs.push({
					FK_username: $rootScope.loggedUser,
					FK_poi_name: poi.name,
					_time_date: new Date().toISOString().replace('T', ' ').replace('Z', ''),
					img: $rootScope.allPois.filter(p => p.name === poi.name)[0].picture,
					category: $rootScope.allPois.filter(p => p.name === poi.name)[0].category,
					poiRank: $rootScope.allPois.filter(p => p.name === poi.name)[0].poiRank,
					DB: false
				});
			}
		}

		self.checkIfinFav = function () {
			if (ModalService.isOpen && $rootScope.userFavs.length > 0) {
				if ($rootScope.userFavs.filter(value => value.FK_poi_name == ModalService.getPOIname()).length > 0)
					return true;
				else return false;
			}
		}

	}]);