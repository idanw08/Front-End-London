
angular.module('london_app')
	.controller('homeGuestController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
		let self = this;

		self.goto = function (page) {
			$location.path(page);
		};

		$http.get('http://localhost:3000/guest/randExplorePOIs/0')
			.then((response) => {
				const ans = response.data;
				self.pois = [];
				for (let i = 0; i < 3; i++) {
					self.pois.push({
						name: ans[i].name,
						picture: ans[i].picture,
						numViews: ans[i].numViews,
						poiDescription: ans[i].poiDescription,
						poiRank: ans[i].poiRank,
						category: ans[i].category,
						reviews: ans[i].reviews
					})
				}
			});
	}]);