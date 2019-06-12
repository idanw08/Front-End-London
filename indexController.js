angular.module('london_app').controller('indexController', ['$rootScope', '$scope', function ($rootScope, $scope) {
	$rootScope.config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};
	$rootScope.loggedUser = 'Guest'

	let XHR = new XMLHttpRequest()
	XHR.open("GET", "countries.xml", true)
	XHR.onload = function () {
		let countries = []
		const doc = XHR.responseXML
		const countriesTags = doc.getElementsByTagName("Countries")[0].getElementsByTagName("Country")
		let tmp = Array.prototype.slice.call(countriesTags,0)
		for (let i = 0; i < tmp.length; i++) {
			countries.push({
				id: tmp[i].getElementsByTagName("ID")[0].textContent,
				name: tmp[i].getElementsByTagName("Name")[0].textContent
			})
		}
		$rootScope.countries = countries
	}
	XHR.send()

}]);