angular.module('london_app')
	.controller('loginController', ['$scope', '$rootScope', '$http', '$location', '$httpParamSerializerJQLike', 'tokenStorage',
		function ($scope, $rootScope, $http, $location, $httpParamSerializerJQLike, tokenStorage) {
			let self = this;

			self.sumbitLogin = function () {
				$http.post('http://localhost:3000/auth/login', $httpParamSerializerJQLike(self.user), $rootScope.postConfig)
					.then(function (response) {
						const data = response.data;
						if (!data.token) {
							// console.log('here1 !!');
							alert('username or password incorrect!');
							return
						}
						// tokenStorage.setHeadersToken(data.token)
						tokenStorage.addUserToken(self.user.username, data.token) //saves the token in localstorage
						$rootScope.isLoggedIn = true
						$rootScope.loggedUser = self.user.username

						// gets the user's favourite POIs
						$http.get("http://localhost:3000/user/getUserFavourites/" + self.user.username, $rootScope.tokenHeaderConfig(self.user.username))
							.then(function (response) {
								if (response.data.message) {
									// do nothing cause there are no favs in the DB
								} else {
									response.data.forEach(element => {
										$rootScope.userFavs.push({
											FK_username: element.FK_username,
											FK_poi_name: element.FK_poi_name,
											_time_date: element._time_date.replace('T', ' ').replace('Z', ''),
											img: $rootScope.allPois.filter(p => p.name === element.FK_poi_name)[0].picture,
											category: $rootScope.allPois.filter(p => p.name === element.FK_poi_name)[0].category,
											poiRank: $rootScope.allPois.filter(p => p.name === element.FK_poi_name)[0].poiRank,
											DB: true
										})
									});
								}
							},
								function (error) { }
							);

						$location.path('/homeUser')
					},
						function (response) {
							if (response.status === 403) {
								alert('username or password incorrect!');
							}
						}
					)
			}

			self.getRecoveryQuestion = function (usernameObj) {
				const username = { username: usernameObj.$viewValue }
				$http.post('http://localhost:3000/auth/recoveryQuestions', $httpParamSerializerJQLike(username), $rootScope.postConfig)
					.then(
						function (response) {
							//console.log(response.data);
							if (response.data.message) {
								alert(`User ${username.username} does not exist.`)
								return
							}
							self.passwordRecover = response.data
							let qLabel = document.getElementById('recoveryQuestion')
							let question = ''
							if (response.data.question === 'momOriginLastName') question = 'What is your mother original last name?'
							if (response.data.question === 'elementarySchoolName') question = 'What\'s your elemantary school name?'
							if (response.data.question === 'favouriteColor') question = 'What\'s your favourite color?'
							if (response.data.question === 'childhoodBFF') question = 'What\'s your childhood best friend\'s name?'
							let qText = document.createTextNode(question)
							qLabel.appendChild(qText)

							let recDiv = document.getElementById('recoveryDiv')
							document.getElementById('forgotPassword').disabled = true
							recDiv.style = "display: unset"
						},
						function () {
							alert(`Error - Username ${username} does not exist.`)
						}
					)
			}

			self.recoverPassword = function () {
				if (self.recoveryAnswer === '') {
					alert('Enter Your Answer!')
					return
				}

				if (self.recoveryAnswer.toLowerCase() !== self.passwordRecover.answer.toLowerCase()) {
					alert('Wrong Answer')
					return
				}
				let obj = {
					username: self.user.username,
					question: self.passwordRecover.question,
					answer: self.passwordRecover.answer
				}
				$http.post('http://localhost:3000/auth/passwordRecovery', $httpParamSerializerJQLike(obj), $rootScope.postConfig)
					.then(
						function (response) {
							if (response.status === 400) {
								alert('Cannot complete request. ERROR.')
								return
							}
							if (response.status === 401) {
								alert('Incorrect answer!')
								return
							}
							document.getElementById('forgotPassword').disabled = false
							alert(`Your password: ${response.data.password}`)

							document.getElementById('passRecForm').reset();
							document.getElementById('recoveryQuestion').innerHTML = ''
							document.getElementById('recoveryDiv').style = "display: none"
						},
						function (error) {

						}
					)
			}
		}]);