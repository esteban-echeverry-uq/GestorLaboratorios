const ServerAction = require('../helpers/serverAction');
const StoreAction = require('../helpers/storeAction');
const { USER: USER_ENDPOINTS } = require('../configs/constants/endpoints');

module.exports = class SessionService {
	async getCurrentUser() {
		try {
			const currentUser = StoreAction.get('currentUser');

			return {
				status: 'success',
				currentUser
			};
		} catch (e) {
			return {
				status: 'error',
				message: e.message
			};
		}
	}

	async login(loginData) {
		const options = {
			data: { ...loginData }
		};

		try {
			const { data } = await ServerAction(USER_ENDPOINTS.LOGIN, {}, options);


			if (data.status === 'success') {
				const { user } = data;
				await StoreAction.set('currentUser', user);

				return {
					status: 'success',
					currentUser: user
				};
			}
			else {
				return {
					status: 'error',
					message: data.message
				};
			}
		} catch (e) {

			return {
				status: 'error',
				message: e.message
			};
		}
	}

	async register(newUser) {
		const options = {
			data: {
				...newUser
			}
		};

		try {
			const { data } = await ServerAction(USER_ENDPOINTS.REGISTER, {}, options);

			if (data.status === 'success') {
				const { user } = data;
				await StoreAction.set('currentUser', user);

				return {
					status: 'success',
					currentUser: user
				};
			}
			else {
				return {
					status: 'error',
					message: data.message
				};
			}
		} catch (e) {
			return {
				status: 'error',
				message: e.message
			};
		}
	}
};
