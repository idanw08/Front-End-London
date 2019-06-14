angular.module('london_app')
	.controller('registerController', ['$scope', '$rootScope', '$http', '$httpParamSerializerJQLike', function ($scope, $rootScope, $http, $httpParamSerializerJQLike) {
		let self = this
		self.favourites = [false, false, false, false]
		self.countries = $rootScope.countries
		self.country = countries[0]
		self.cats = [
			{ id: 0, name: 'Food', selected: false },
			{ id: 1, name: 'Culture', selected: false },
			{ id: 2, name: 'Shopping', selected: false },
			{ id: 3, name: 'Night_Life', selected: false }
		]
		self.favsCats = []
		self.momOriginLastName = ''
		self.elementarySchoolName = ''
		self.favouriteColor = ''
		self.childhoodBFF = ''

		self.submitRegister = function () {
			let newUser = {
				username: self.username,
				password: self.password,
				firstName: self.firstName,
				lastName: self.lastName,
				city: self.city,
				country: self.country.name,
				email: self.email,
				favourites: '',
				momOriginLastName: self.momOriginLastName,
				elementarySchoolName: self.elementarySchoolName,
				favouriteColor: self.favouriteColor,
				childhoodBFF: self.childhoodBFF
			}
			if (self.favourites[0]) newUser.favourites = 'Food'
			if (self.favourites[1]) newUser.favourites = ',Culture'
			if (self.favourites[2]) newUser.favourites = ',Shopping'
			if (self.favourites[3]) newUser.favourites = ',Night_Life'

			console.log(newUser.country)
			// $http.post('http://localhost:3000/auth/register', $httpParamSerializerJQLike), $rootScope.config)
			// 	.then(function (response) {
			// 		console.log(response.data)
			// 	})
		}

		self.verifyFavourites = function () {
			let favs = ""
			let checked = 0
			if (self.food) { favs + ', Food'; checked++ }
			if (self.culture) { favs + ', Culture'; checked++ }
			if (self.shopping) { favs + ',Shopping'; checked++ }
			if (self.night_life) { favs + ', Night_Life'; checked++ }
			return (checked > 1)
		}

		self.verifyQuestions = function () {
			let answered = 0
			if (self.momOriginLastName !== '') answered++
			if (self.elementarySchoolName !== '') answered++
			if (self.favouriteColor !== '') answered++
			if (self.childhoodBFF !== '') answered++
			return (answered > 1)
		}

		self.checkedCategory = function (id) {
			//favsCats[id] = favsCats[id] === 0 ? 1 :
		}

		// if (fav === 'Food') {
		// 	if (!self.favourites[0]) { self.favourites[0] = true }
		// 	else self.favourites[0] = false
		// }
		// else if (fav === 'Culture') {
		// 	if (!self.favourites[1]) { self.favourites[1] = true }
		// 	else self.favourites[1] = false
		// }
		// else if (fav === 'Shopping') {
		// 	if (!self.favourites[2]) { self.favourites[2] = true }
		// 	else self.favourites[2] = false
		// }
		// else {
		// 	if (!self.favourites[3]) { self.favourites[3] = true }
		// 	else self.favourites[3] = false
		// }
		//console.log(self.favourites)
	}

		// self.getCountries = function () {
		// 	const select = document.getElementById("countries")
		// 	for (let i = 0; i < $rootScope.countries.length; i++) {
		// 		let option = document.createElement("option")
		// 		let text = document.createTextNode($rootScope.countries[i].name)
		// 		//option.setAttribute("ng-value", "country")
		// 		option.appendChild(text)
		// 		select.appendChild(option)
		// 	}
		// }
	}]);