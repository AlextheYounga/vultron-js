/* eslint-env jest */
const AuthController = require('../../../app/controllers/AuthController.js')
const User = require('../../../app/models/User')
import { faker } from '@faker-js/faker';

describe('AuthController', () => {
	var testUser = {
		name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		username: faker.internet.userName(),
		password: faker.internet.password(),
		email: faker.internet.email()
	}

	beforeAll(async () => {
		return await User.forge(testUser).save()
	})

	afterAll(() => {
		return User.where({ email: testUser.email })
			.destroy()
			.catch((error) => {
				console.log(error)
			})
	})

	describe('when user is authenticated while offline', () => {
		describe('when credentials are correct', () => {
			let creds = { email: testUser.email, password: testUser.password }
			it('user can login', () => {
				return AuthController.login(creds).then((user) => {
					return expect(user.email).toEqual(creds.email)
				})
			})

		})
		describe('when credentials are incorrect', () => {
			it('returns incorrect email', () => {
				return AuthController.login({
					email: 'alex@poop.com',
					password: testUser.password
				}).then((res) => {
					return expect(res).toEqual('Email not found')
				})
			})
			it('returns incorrect password', () => {
				return AuthController.login({ email: testUser.email, password: 'poop' })
					.then((res) => {
						return expect(res).toEqual('Password is incorrect')
					})
			})
		})
	})
})
