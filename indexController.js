angular.module('london_app').controller('indexController', ['$rootScope', '$scope', 'tokenStorage', '$location', 'ModalService', '$http', '$httpParamSerializerJQLike',
	function ($rootScope, $scope, tokenStorage, $location, ModalService, $http, $httpParamSerializerJQLike) {
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
		$rootScope.localFav = []

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

					},
					function (error) {
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
	}]);