angular.module('london_app')
	.controller('favouritesController', ['$rootScope', '$scope', '$http', '$location', '$httpParamSerializerJQLike', 'ModalService', 'tokenStorage', 'RemoveDBFavourite',
		function ($rootScope, $scope, $http, $location, $httpParamSerializerJQLike, ModalService, tokenStorage, RemoveDBFavourite) {
			let self = this
			self.haveFavs = ($rootScope.userFavs.length > 0)
			$scope.order
			self.saveInFavLocalList = function (favPoi) {
				if ($rootScope.userFavs.filter(value => value.name == favPoi.name).length > 0) {
					let i = $rootScope.userFavs.findIndex(x => x.name === favPoi.name);
					if (i > -1) $rootScope.userFavs.splice(i, 1);
				} else {
					$rootScope.userFavs.push(favPoi);
					console.log($rootScope.userFavs)
				}
			}

			self.saveInDB = function() {
				const favourites = []
				const config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'authorization': `Bearer ${tokenStorage.getUserToken($rootScope.loggedUser)}`
					}
				}
				$rootScope.userFavs.forEach(element => {
					favourites.push({
						poi: element.FK_poi_name,
						timeDate: element._time_date
					})
				});
				const obj = {
					username: $rootScope.loggedUser,
					favourites: favourites
				}
				$http.post('http://localhost:3000/user/poi/savePOI_server', $httpParamSerializerJQLike(obj), config)
				.then(
					function(response) {
						if(response.status === 200){
							$rootScope.userFavs.forEach(e => e.DB = true)
							alert('Saved in DB!')
						} else {
							alert('ERR_NOT_SAVED_IN_DB')
						}
					}
				)
			}

			self.removeFrom_FavLocalList = function (favPoi) {
				if (favPoi.DB) {
					RemoveDBFavourite.delete(favPoi.FK_poi_name)
				}
				$rootScope.userFavs.splice($rootScope.userFavs.indexOf(favPoi), 1)
			}

			self.checkIfinFav = function (poi) {
				if ($rootScope.userFavs.length > 0) {
					if ($rootScope.userFavs.filter(value => value.name == poi.name).length > 0)
						return true;
					else return false;
				}
			}

			self.moveUp = function (poi) {
				// document.getElementById("sorter").selectedIndex = "0"
				// self.order = "none"
				// $filter('orderBy')($root.userFavs, "order")
				const idx = $rootScope.userFavs.indexOf(poi)
				if (idx === 0) return

				const tmp = $rootScope.userFavs[idx - 1]
				$rootScope.userFavs[idx - 1] = poi
				$rootScope.userFavs[idx] = tmp
			}

			self.moveDown = function (poi) {
				// document.getElementById("sorter").selectedIndex = "0"
				// self.order = "none"
				// $filter('orderBy')($root.userFavs, "order")
				const idx = $rootScope.userFavs.indexOf(poi)
				if (idx === $rootScope.userFavs.length - 1) return

				const tmp = $rootScope.userFavs[idx + 1]
				$rootScope.userFavs[idx + 1] = poi
				$rootScope.userFavs[idx] = tmp
			}

			self.open = function (poiName) {
				if (!ModalService.isOpen) ModalService.open($rootScope.allPois.filter(p => p.name === poiName)[0]);
			};
		}])