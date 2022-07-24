const { assert } = require('chai')
const {
	describe,
	it,
} = require('mocha')
const AuthController = require('../app/server/controllers/auth_controller.js')
require('../app/helpers/prototypes.js')
require('should')

describe('authentication', () => {
	describe('when user is authenticated using a custom API', () => {
		describe('when credentials are correct', () => {
			it('user can login', () => {
				return AuthController.login({email: 'alex@mail.com', password: 'password'}).then((user) => {
					assert.isObject(user)
				})
			})
		})
		describe('when credentials are incorrect', () => {
			it('returns incorrect email message', () => {
				return AuthController.login({email: 'alex@poop.com', password: 'password'}).then((res) => {
					assert.ok(res == 'Email not found')
				})
			})
			it('returns incorrect password message', () => {
				return AuthController.login({email: 'alex@mail.com', password: 'poop'}).then((res) => {
					assert.ok(res == 'Password is incorrect')
				})
			})
		})
	})
	describe('when user is authenticated while offline', () => {
		describe('when credentials are correct', () => {
			it('user can login', () => {
				return AuthController.login({email: 'alex@mail.com', password: 'password'}).then((user) => {
					assert.isObject(user)
				})
			})

		})
		describe('when credentials are incorrect', () => {
			it('returns incorrect email', () => {
				return AuthController.login({email: 'alex@poop.com', password: 'password'}).then((res) => {
					assert.ok(res == 'Email not found')
				})
			})
			it('returns incorrect password', () => {
				return AuthController.login({email: 'alex@mail.com', password: 'poop'}).then((res) => {
					assert.ok(res == 'Password is incorrect')
				})
			})
		})
	})
})
