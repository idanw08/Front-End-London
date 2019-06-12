angular.module('london_app').service('tokenStorage', ['localStorageService', function (localStorageService) {
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

	self.getUserToken = function (key) {
		return localStorageService.get(key)
	}
}]);