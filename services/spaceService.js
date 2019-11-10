const ServerAction = require('../helpers/serverAction');
const { SPACE: SPACE_ENDPOINTS } = require('../configs/constants/endpoints');

module.exports = class SessionService {
	async getAll() {
		try {
			const { data } = await ServerAction(SPACE_ENDPOINTS.GET_ALL);

			if (data.status === 'success') {
				return {
					status: 'success',
					spaces: data.spaces
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

	async getByID(spaceID) {
		const URLParams = { spaceID	};

		try {
			const { data } = await ServerAction(SPACE_ENDPOINTS.GET_BY_ID, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					space: data.space
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

	async create(newSpace) {
		const options = {
			data: { ...newSpace }
		};

		try {
			const { data } = await ServerAction(SPACE_ENDPOINTS.CREATE, {}, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					space: data.space
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

	async update(space) {
		const options = {
			data: { ...space }
		};

		const URLParams = {
			spaceID: space._id
		};

		try {
			const { data } = await ServerAction(SPACE_ENDPOINTS.UPDATE, URLParams, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					space: data.space
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

	async delete(space) {
		const URLParams = {
			spaceID: space._id
		};

		try {
			const { data } = await ServerAction(SPACE_ENDPOINTS.DELETE, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
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
