const Axios = require('axios');
const URLGenerator = require('../helpers/endpointURLGenerator');

module.exports = async ({ METHOD, PATH }, options) => {
	const URL = URLGenerator(PATH);

	return await Axios({
		method: METHOD,
		url: URL,
		...options
	});
};
