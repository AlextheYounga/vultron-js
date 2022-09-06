/* eslint-env jest */
const AuthController = require('../../../app/controllers/AuthController.js')
const { instance } = require('../../../framework/Database/dbconnection')

describe('AuthController', () => {
	var testEmail = 'alex@alextheyounger.me'

	beforeAll(done => {
		done()
	})
	afterAll(done => {
		instance().knex.destroy();
		done()
	})

	describe('when user is authenticated while offline', () => {
		describe('when credentials are correct', () => {
			let creds = { email: testEmail, password: 'password' }
			it('user can login', () => {
				return AuthController.login(creds).then((user) => {
					return expect(user.email).toEqual(creds.email)
				})
			})

		})
		describe('when credentials are incorrect', () => {
			it('returns incorrect email', () => {
				return AuthController.login({ email: 'alex@poop.com', password: 'password' }).then((res) => {
					return expect(res).toEqual('Email not found')
				})
			})
			it('returns incorrect password', () => {
				return AuthController.login({ email: testEmail, password: 'poop' }).then((res) => {
					return expect(res).toEqual('Password is incorrect')
				})
			})
		})
	})
})
