let app = angular.module('london_app', ["ngRoute", "LocalStorageModule"]);

app.config(['localStorageServiceProvider', function(localStorageServiceProvider){
	localStorageServiceProvider.setPrefix('london_app');
}]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'components/Home_Guest/home_guest.html',
			controller: 'homeGuestController as homeGuestCtrl'
		})
		.when('/login', {
			templateUrl: 'components/Login/login.html',
			controller: 'loginController as loginCtrl'
		})
		.when('/register', {
			templateUrl: 'components/Register/register.html',
			controller: 'registerController as registerCtrl'
		})
		.when('/homeUser', {
			templateUrl: 'components/Home_User/home_user.html',
			controller: 'homeUserController as homeUserCtrl'
		})
		.when('/about', {
			templateUrl: 'components/About/about.html'
		})
		.when('/poi', {
			templateUrl: 'components/All_Points_Interst/all_poi.html',
			controller: 'allPointsofInterstController as allPOICtrl'
		})
		.otherwise({redirectTo: '/'});
}]);


