const SessionService = require('../services/sessionService');
const sessionService = new SessionService();

sessionService.login({
	email: 'jjms95@hotmail.com',
	password: '12345'
}).then(response => {
	console.log(response);
}).catch(error => {
	console.log(error);
});

