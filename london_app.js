let app = angular.module('london_app', ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'components/home_guest.html',
			controller: 'homeGuestCtrl'
		});
});


