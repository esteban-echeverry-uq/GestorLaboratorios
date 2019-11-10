const ServerAction = require('../helpers/serverAction');
const { TOOL: TOOL_ENDPOINTS } = require('../configs/constants/endpoints');

module.exports = class SessionService {
	async getAll(spaceID) {
		const URLParams = { spaceID	};

		try {
			const { data } = await ServerAction(TOOL_ENDPOINTS.GET_ALL, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					tools: data.tools
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

	async getByID(toolID) {
		const URLParams = { toolID };

		try {
			const { data } = await ServerAction(TOOL_ENDPOINTS.GET_BY_ID, URLParams);

			if (data.status === 'success') {
				return {
					status: 'success',
					tool: data.tool
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

	async create(newTool) {
		const options = {
			data: { ...newTool }
		};

		const URLParams = {
			spaceID: newTool.spaceID
		};

		try {
			const { data } = await ServerAction(TOOL_ENDPOINTS.CREATE, URLParams, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					tool: data.tool
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

	async update(tool) {
		const options = {
			data: { ...tool }
		};

		const URLParams = {
			toolID: tool._id
		};

		try {
			const { data } = await ServerAction(TOOL_ENDPOINTS.UPDATE, URLParams, options);

			if (data.status === 'success') {
				return {
					status: 'success',
					tool: data.tool
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

	async delete(tool) {
		const URLParams = {
			toolID: tool._id
		};

		try {
			const { data } = await ServerAction(TOOL_ENDPOINTS.DELETE, URLParams);

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
