
const ServerAction = require('../helpers/serverAction');
const { RESERVATION: RERVATION_ENDPOINTS } = require('../configs/constants/endpoints');

module.exports = class SessionService {
	async getAll(filters) {
		const options = {
			data: { ...filters }
		};

		try {
			const { data } = await ServerAction(RERVATION_ENDPOINTS.ADMIN_GET_ALL, {}, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					reservations: data.reservations
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

	async getAllByElement(elementID) {
		const URLParams = { elementID };

		try {
			const { data } = await ServerAction(RERVATION_ENDPOINTS.GET_ALL_BY_ELEMENT, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					reservations: data.reservations
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

	async getAllByUser(userID) {
		const URLParams = { userID };

		try {
			const { data } = await ServerAction(RERVATION_ENDPOINTS.GET_ALL_BY_USER, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					reservations: data.reservations
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

	async getByID(reservationID) {
		const URLParams = { reservationID };

		try {
			const { data } = await ServerAction(RERVATION_ENDPOINTS.GET_BY_ID, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					reservation: data.reservation
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

	async create(newReservation) {
		const options = {
			data: { ...newReservation }
		};

		const URLParams = {
			elementID: newReservation.elementID
		};

		try {
			const { data } = await ServerAction(RERVATION_ENDPOINTS.CREATE, URLParams, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					reservation: data.reservation
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

	async update(reservation) {
		const options = {
			data: { ...reservation }
		};

		const URLParams = {
			reservationID: reservation._id
		};

		try {
			const { data } = await ServerAction(RERVATION_ENDPOINTS.UPDATE, URLParams, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					reservation: data.reservation
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

	async delete(reservation) {
		const URLParams = {
			reservationID: reservation._id
		};

		try {
			const { data } = await ServerAction(RERVATION_ENDPOINTS.DELETE, URLParams);

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

	async confirm(reservation) {
		const URLParams = {
			reservationID: reservation._id
		};

		try {
			const { data } = await ServerAction(RERVATION_ENDPOINTS.CONFIRM, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					reservation: data.reservation
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
