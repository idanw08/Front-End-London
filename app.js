let app = angular.module('london_app', ["ngRoute", "LocalStorageModule"]);

app.config(['localStorageServiceProvider', function(localStorageServiceProvider){
	localStorageServiceProvider.setPrefix('london_app');
}]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'components/home_guest.html',
			controller: 'homeGuestController as homeGuestCtrl'
		})
		.when('/login', {
			templateUrl: 'components/login.html',
			controller: 'loginController as loginCtrl'
		})
		.when('/', {
			templateUrl: 'components/login.html',
			controller: 'loginController as loginCtrl'
		})
		.otherwise({redirectTo: '/'});
}]);


