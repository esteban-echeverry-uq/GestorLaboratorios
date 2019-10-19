const Axios = require('axios');
const URLGenerator = require('../helpers/endpointURLGenerator');

module.exports = async ({ METHOD, PATH }, URLParams, options) => {
	const URL = URLGenerator(PATH, URLParams);

	return await Axios({
		method: METHOD,
		url: URL,
		...options
	});
};
