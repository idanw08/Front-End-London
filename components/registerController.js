angular.module('london_app')
	.controller('registerController', ['$scope', '$rootScope', '$http', '$httpParamSerializerJQLike', function ($scope, $rootScope, $http, $httpParamSerializerJQLike) {
		let self = this;
		self.favourites = [false, false, false, false];

		self.submitRegister = function () {
			let user = {
				username: self.user.username,
				password: self.user.password,
				firstName: self.user.firstName,
				lastName: self.user.lastName,
				city: self.user.city,
				country: self.user.country,
				email: self.user.email,
				favourites: '',
				momOriginLastName: self.user.momOriginLastName,
				elementarySchoolName: self.user.elementarySchoolName,
				favouriteColor: self.user.favouriteColor,
				childhoodBFF: self.user.childhoodBFF
			}
			if (self.favourites[0]) user.favourites = 'Food'
			if (self.favourites[1]) user.favourites = ',Culture'
			if (self.favourites[2]) user.favourites = ',Shopping'
			if (self.favourites[3]) user.favourites = ',Night_Life'

			$http.post('http://localhost:3000/auth/register', $httpParamSerializerJQLike(user), $rootScope.config)
				.then(function (response) {
					console.log(response.data)
				})
		}

		self.getCountries = function () {
			const select = document.getElementById("countries")
			for (let i = 0; i < $rootScope.countries.length; i++) {
				let option = document.createElement("option")
				let text = document.createTextNode($rootScope.countries[i].name)
				option.appendChild(text)
				select.appendChild(option)
			}
		}

		self.verifyFavourites = function () {
			let favs = ""
			let checked = 0
			if (self.user.food) { favs + ', Food'; checked++ }
			if (self.user.culture) { favs + ', Culture'; checked++ }
			if (self.user.shopping) { favs + ',Shopping'; checked++ }
			if (self.user.night_life) { favs + ', Night_Life'; checked++ }
			return (checked > 1)
		}

		self.verifyQuestions = function () {
			let answered = 0
			if (self.user.momOriginLastName !== '') answered++
			if (self.user.elementarySchoolName !== '') answered++
			if (self.user.favouriteColor !== '') answered++
			if (self.user.childhoodBFF !== '') answered++
			return (answered > 1)
		}

		self.addFavourite = function (fav) {
			if (fav === 'Food') {
				if (!self.favourites[0]) { self.favourites[0] = true }
				else self.favourites[0] = false
			}
			else if (fav === 'Culture') {
				if (!self.favourites[1]) { self.favourites[1] = true }
				else self.favourites[1] = false
			}
			else if (fav === 'Shopping') {
				if (!self.favourites[2]) { self.favourites[2] = true }
				else self.favourites[2] = false
			}
			else {
				if (!self.favourites[3]) { self.favourites[3] = true }
				else self.favourites[3] = false
			}
			//console.log(self.favourites)
		}
	}]);