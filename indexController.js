angular.module('london_app').controller('indexController', ['$rootScope', '$scope', 'tokenStorage', '$location', 'ModalService', '$http', '$httpParamSerializerJQLike',
	function ($rootScope, $scope, tokenStorage, $location, ModalService, $http, $httpParamSerializerJQLike) {
		$rootScope.postConfig = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		$rootScope.isLoggedIn = false
		$rootScope.loggedUser = 'Guest'
		$rootScope.allPois = []
        $rootScope.localFav=[];

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
					'Authorization': `Bearer ${token}`
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

		// $rootScope.updatedPOIview = function (poi) {
		// 	$http.post('http://localhost:3000/guest/poi/addPOIview', $httpParamSerializerJQLike(poi), $rootScope.postConfig)
		// 		.then(function (response) {
		// 			$http.get('http://localhost:3000/user/poi/getAll_POI')
		// 				.then(
		// 					function (response) {
		// 						let data = response.data
		// 						$rootScope.allPois = data;
		// 					},
		// 					function (error) { }
		// 				)
		// 		}, function (error) { })
		// }

		self.closeModal = function () {
			document.getElementById('modal-dialog').style.display = 'none';
			document.body.style = 'background-color: white';
			ModalService.isOpen = false
		}

		document.onclick = function (e) {
			let modal = document.getElementById('modal-dialog')
			if (!(e.target === modal || (modal.contains(e.target) && e.target!==document.getElementById('X')))) {
				self.closeModal()
			} 
		}
	}]);