angular.module('london_app').service('tokenStorage', ['localStorageService','$http', function (localStorageService,$http) {
	let self = this;

	self.addUserToken = function (key, value) {
		let tokenVal = localStorageService.get(key);
		if (tokenVal) {
			localStorageService.remove(key)
			localStorageService.set(key, value)
			console.log(`${key} token is stored.`)
			// console.log(localStorageService.keys())
			// console.log(localStorageService.get(key))
		} else {
			if (localStorageService.set(key, value)) {
				console.log(`${key} token is stored.`)
				// console.log(localStorageService.keys())
				// console.log(localStorageService.get(key))
			} else {
				console.log(`${key} token not stored.`)
			}
		}
	}

	// self.setHeadersToken = function(token){
	// 	console.log(token)
	// 	$http.defaults.headers.common['x-access-token'] = token
	// }

	self.getUserToken = function (key) {
		return localStorageService.get(key)
	}

	self.removeUserToken = function(key) {
		localStorage.removeItem(key)
		console.log(`${key} token removed`);
	}
}]);