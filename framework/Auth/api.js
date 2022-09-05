const axios = require('axios');
const config = require('../../app/config/api')
const API = {
	authenticate: async function (form) {
		return await axios.post(`${config.url}/authenticate`, form)
			.then(function (response) {
				if (response.status == 200) {
					return response.data;
				}
			})
			.catch(function (error) {
				if (error.response) {
					// Request made and server responded
					return error.response.data

				} else if (error.request) {
					// The request was made but no response was received
					return error.request
				} else {
					// Something happened in setting up the request that triggered an Error
					return error.message
				}
			})
	},

	register: async function () {
		// Your registration process here
	},
}

module.exports = API