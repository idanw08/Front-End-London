angular.module('london_app')
	.controller('favouritesController', ['$rootScope', '$http', '$location', '$httpParamSerializerJQLike', 'ModalService', 'tokenStorage', 'RemoveDBFavourite',
		function ($rootScope, $http, $location, $httpParamSerializerJQLike, ModalService, tokenStorage, RemoveDBFavourite) {
			let self = this
			self.haveFavs = ($rootScope.localFav.length > 0)
			
			self.saveInFavLocalList = function (favPoi) {
				if ($rootScope.localFav.filter(value => value.name == favPoi.name).length > 0) {
					let i = $rootScope.localFav.findIndex(x => x.name === favPoi.name);
					if (i > -1) $rootScope.localFav.splice(i, 1);
				} else {
					$rootScope.localFav.push(favPoi);
					console.log($rootScope.localFav)
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
				$rootScope.localFav.forEach(element => {
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
							alert('Saved in DB!')
						} else {
							alert('ERR_NOT_SAVED_IN_DB')
						}
					}
				)
			}

			self.removeFrom_FavLocalList = function (favPoi) {
				if (favPoi.DB) {
					RemoveDBFavourite.delete(favPoi)
				}
				$rootScope.localFav.splice($rootScope.localFav.indexOf(favPoi), 1)
			}

			self.checkIfinFav = function (poi) {
				if ($rootScope.localFav.length > 0) {
					if ($rootScope.localFav.filter(value => value.name == poi.name).length > 0)
						return true;
					else return false;
				}
			}

			self.moveUp = function (poi) {
				// document.getElementById("sorter").selectedIndex = "0"
				// self.order = "none"
				// $filter('orderBy')($root.localFav, "order")
				const idx = $rootScope.localFav.indexOf(poi)
				if (idx === 0) return

				const tmp = $rootScope.localFav[idx - 1]
				$rootScope.localFav[idx - 1] = poi
				$rootScope.localFav[idx] = tmp
			}

			self.moveDown = function (poi) {
				// document.getElementById("sorter").selectedIndex = "0"
				// self.order = "none"
				// $filter('orderBy')($root.localFav, "order")
				const idx = $rootScope.localFav.indexOf(poi)
				if (idx === $rootScope.localFav.length - 1) return

				const tmp = $rootScope.localFav[idx + 1]
				$rootScope.localFav[idx + 1] = poi
				$rootScope.localFav[idx] = tmp
			}

			self.open = function (poiName) {
				if (!ModalService.isOpen) ModalService.open($rootScope.allPois.filter(p => p.name === poiName)[0]);
			};
		}])