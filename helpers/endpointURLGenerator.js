const domainURL = 'https://gestor-laboratorios-uq.herokuapp.com';

module.exports = (PATH, URLParams) => {
	const path = eval(PATH);

	return `${domainURL}/${path}`
};
