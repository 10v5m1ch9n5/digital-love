const axios = require('axios');

module.exports = {
	risibankAPI: axios.create({
		baseURL: 'https://risibank.fr/api/v1',
		timeout: 1000,
		headers: {'accept': 'application/json'}
	})
};
