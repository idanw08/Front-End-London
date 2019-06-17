angular.module('london_app')
	.controller('loginController', ['$scope', '$rootScope', '$http', '$location', '$httpParamSerializerJQLike', 'tokenStorage',
		function ($scope, $rootScope, $http, $location, $httpParamSerializerJQLike, tokenStorage) {
			let self = this;

			self.sumbitLogin = function () {
				$http.post('http://localhost:3000/auth/login', $httpParamSerializerJQLike(self.user), $rootScope.postConfig)
					.then(function (response) {
						const data = response.data;
						if (data.status === 403) {
							alert('username or password incorrect!');
							return
						}
						if (!data.token) {
							console.log('missing user\'s token')
							return
						}
						// tokenStorage.setHeadersToken(data.token)
						tokenStorage.addUserToken(self.user.username, data.token) //saves the token in localstorage
						$rootScope.isLoggedIn = true
						$rootScope.loggedUser = self.user.username
						$location.path('/homeUser')
					},
						function (response) {
							alert('Error.')
						}
					)
			}

			self.getRecoveryQuestion = function (usernameObj) {
				const username = { username: usernameObj.$viewValue }
				if (username.username === undefined || username.username === '') {
					alert('Enter Username')
					return
				}
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