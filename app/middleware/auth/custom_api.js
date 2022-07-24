const axios = require('axios');
// Use API of your own choosing here to verify from third party source.
const CustomApi = {
	address: 'http://localhost/api/v1/authenticate',
	authenticate: async function (form) {
		return await axios.post(this.address, form)
			.then(function (response) {
				if (response.status == 200) {
					return response.data;
				}
			})
			.catch(function (error) {
				if (error.response) {
					// Request made and server responded
					console.log(error.response.status);
					console.log(error.response.headers);
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
}

module.exports = CustomApi