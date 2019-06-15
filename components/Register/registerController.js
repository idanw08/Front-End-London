angular.module('london_app')
	.controller('registerController', ['$scope', '$rootScope', '$http', '$httpParamSerializerJQLike', '$location', function ($scope, $rootScope, $http, $httpParamSerializerJQLike, $location) {
		let self = this
		self.favourites = [false, false, false, false]
		self.countries = $rootScope.countries
		self.country = countries[0]
		self.cats = [
			{ id: 0, name: 'Food' },
			{ id: 1, name: 'Culture' },
			{ id: 2, name: 'Shopping' },
			{ id: 3, name: 'Night Life' }
		]
		self.favsCats = [false, false, false, false]
		self.numCatSelected = 0
		self.momOriginLastName = ''
		self.elementarySchoolName = ''
		self.favouriteColor = ''
		self.childhoodBFF = ''

		self.checkedCategory = function (id) {
			self.favsCats[id] ? self.numCatSelected-- : self.numCatSelected++
			self.favsCats[id] = !self.favsCats[id]
		}

		self.validateMin2Cats = function () {
			return (self.numCatSelected > 1)
		}

		self.verifyQuestions = function () {
			let answered = 0
			if (self.momOriginLastName !== '') answered++
			if (self.elementarySchoolName !== '') answered++
			if (self.favouriteColor !== '') answered++
			if (self.childhoodBFF !== '') answered++
			return (answered > 1)
		}

		self.submitRegister = function () {
			if (self.numCatSelected < 2) {
				alert('SELECT MIN 2 Categories!')
				return
			}
			if (!self.verifyQuestions()) {
				alert('ANSWER MIN 2 RECOVERY QUESTIONS!')
				return
			}
			let stringyCats = ''
			for (let i = 0; i < 4; i++) {
				if (self.favsCats[i]) {
					if (stringyCats === '') stringyCats = (i === 3) ? 'Night_Life' : `${self.cats[i].name}`
					else stringyCats += (i === 3) ? ',Night_Life' : `,${self.cats[i].name}`
				}
			}
			let newUser = {
				username: self.username,
				password: self.password,
				firstName: self.firstName,
				lastName: self.lastName,
				city: self.city,
				country: self.country.name,
				email: self.email,
				categories: stringyCats,
				momOriginLastName: self.momOriginLastName,
				elementarySchoolName: self.elementarySchoolName,
				favouriteColor: self.favouriteColor,
				childhoodBFF: self.childhoodBFF
			}
			//console.log(newUser)
			$http.post('http://localhost:3000/auth/register', $httpParamSerializerJQLike(newUser), $rootScope.postConfig)
				.then(
					function (response) {
						if (response.data.ans) {
							document.getElementById('regForm').reset();
							document.getElementById('defaultOption').selected = true
							self.favourites = [false, false, false, false]
							self.numCatSelected = 0
							self.momOriginLastName = ''
							self.elementarySchoolName = ''
							self.favouriteColor = ''
							self.childhoodBFF = ''
							$rootScope.loggedUser = newUser.username
							$location.path('/login')

						} else {
							alert('Username already exist.')
						}
					},
					function (response) {
						alert('Error!!.')
					}
				)
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
		// }

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