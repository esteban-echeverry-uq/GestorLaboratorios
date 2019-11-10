const ServerAction = require('../helpers/serverAction');
const { ROOM: ROOM_ENDPOINTS } = require('../configs/constants/endpoints');

module.exports = class SessionService {
	async getAll(spaceID) {
		const URLParams = { spaceID	};

		try {
			const { data } = await ServerAction(ROOM_ENDPOINTS.GET_ALL, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					rooms: data.rooms
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

	async getByID(roomID) {
		const URLParams = { roomID };

		try {
			const { data } = await ServerAction(ROOM_ENDPOINTS.GET_BY_ID, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					room: data.room
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

	async create(newRoom) {
		const options = {
			data: { ...newRoom }
		};

		const URLParams = {
			spaceID: newRoom.spaceID
		};

		try {
			const { data } = await ServerAction(ROOM_ENDPOINTS.CREATE, URLParams, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					room: data.room
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

	async update(room) {
		const options = {
			data: { ...room }
		};

		const URLParams = {
			roomID: room._id
		};

		try {
			const { data } = await ServerAction(ROOM_ENDPOINTS.UPDATE, URLParams, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					room: data.room
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

	async delete(room) {
		const URLParams = {
			roomID: room._id
		};

		try {
			const { data } = await ServerAction(ROOM_ENDPOINTS.DELETE, URLParams);

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
