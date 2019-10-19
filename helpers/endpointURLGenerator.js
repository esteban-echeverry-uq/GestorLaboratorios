const domainURL = 'https://gestor-laboratorios.herokuapp.com';

module.exports = (PATH, options) => {
	const path = eval(PATH);

	return `${domainURL}/${path}`
};
