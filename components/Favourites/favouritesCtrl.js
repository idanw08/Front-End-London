angular.module('london_app')
	.controller('favouritesController', ['$rootScope', '$http', '$location', '$httpParamSerializerJQLike', 'ModalService',
		function ($rootScope, $http, $location, $httpParamSerializerJQLike, ModalService) {
			let self = this

			self.saveInFavLocalList = function (POi) {
				if ($rootScope.localFav.filter(value => value.name == POi.name).length > 0) {
					let i = $rootScope.localFav.findIndex(x => x.name === POi.name);
					if (i > -1) $rootScope.localFav.splice(i, 1);
				} else {
					$rootScope.localFav.push(POi);
					console.log($rootScope.localFav)
				}
			}

			self.checkIfinFav = function (POi) {
				if ($rootScope.localFav.length > 0) {
					if ($rootScope.localFav.filter(value => value.name == POi.name).length > 0)
						return true;
					else return false;
				}
			}

			self.moveUp = function (poi) {

			}

			self.moveDown = function (poi) {

			}

			self.open = function (poi) {
				if (!ModalService.isOpen) ModalService.open(poi);
			};
		}])