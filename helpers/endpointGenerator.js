const domainURL = 'https://gestor-laboratorios.herokuapp.com';

module.exports = (ENDPOINT, options) => {
	const path = eval(ENDPOINT.PATH);

	return `${domainURL}/${path}`
};
