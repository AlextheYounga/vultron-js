const User = require('../../../app/models/User')
const AuthController = require('../../../app/controllers/AuthController.js')

describe('AuthController', () => {
    var testEmail = 'alex@test.com'

	describe('when user is authenticated using the API', () => {
		describe('when credentials are correct', () => {
			let creds = { email: testEmail, password: 'testes' }
			it('user can login', () => {
				return AuthController.login(creds).then((user) => {
					expect(user.email).toEqual(creds.email)
				})
			})
		})
		describe('when credentials are incorrect', () => {
			it('returns incorrect email message', () => {
				return AuthController.login({ email: 'alex@poop.com', password: 'password' }).then((res) => {
					expect(res.message).toEqual('Email not found')
				})
			})
			it('returns incorrect password message', () => {
				return AuthController.login({ email: testEmail, password: 'poop' }).then((res) => {
					expect(res.message).toEqual('Password is incorrect')
				})
			})
		})
	})
	describe('when user is authenticated while offline', () => {
		describe('when credentials are correct', () => {
			let creds = { email: testEmail, password: 'testes' }
			it('user can login', () => {
				return AuthController.login(creds).then((user) => {
					expect(user.email).toEqual(creds.email)
				})
			})

		})
		describe('when credentials are incorrect', () => {
			it('returns incorrect email', () => {
				return AuthController.login({ email: 'alex@poop.com', password: 'password' }).then((res) => {
					expect(res.message).toEqual('Email not found')
				})
			})
			it('returns incorrect password', () => {
				return AuthController.login({ email: testEmail, password: 'poop' }).then((res) => {
					expect(res.message).toEqual('Password is incorrect')
				})
			})
		})
	})
	describe('when user is soft authenticated using pin code', () => {
		describe('when pin is correct returns user object', () => {
			it('user can login', () => {
				return User.where({ email: testEmail }).fetch().then((user) => {
					return AuthController.softLogin({ user_id: user.id, pin: '1235' }).then((loggedIn) => {
						expect(loggedIn.id).toEqual(user.id)
					})
				})
			})
		})
		describe('when pin is incorrect', () => {
			it('user cannot login login', () => {
				return User.where({ email: testEmail }).fetch().then((user) => {
					return AuthController.softLogin({ user_id: user.id, pin: '123456789' }).then((res) => {
						expect(res.message).toEqual('Pin code is incorrect')
					})
				})
			})
		})
	})
})
