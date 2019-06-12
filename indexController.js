angular.module('london_app').controller('indexController', ['$rootScope', '$scope', function($rootScope, $scope){
	$rootScope.config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};
	$rootScope.loggedUser = 'Guest'
}]);