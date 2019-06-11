
angular.module('london_app')
	.controller('homeGuestCtrl', function ($scope, $http) {
		$http.get('http://localhost:3000/guest/randExplorePOIs/0')
			.then((response) => {
				const ans = response.data;
				$scope.pois = [];
				for (let i = 0; i < 3; i++) {
					$scope.pois.push({
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
	});