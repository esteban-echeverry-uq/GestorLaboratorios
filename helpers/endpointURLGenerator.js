const domainURL = 'https://gestor-laboratorios-api.herokuapp.com';

module.exports = (PATH, URLParams) => {
	const path = eval(PATH);

	return `${domainURL}/${path}`
};
