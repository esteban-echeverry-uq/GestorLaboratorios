const httpMethods = require('./httpMethods');


module.exports = {
	RESERVATION: {
		ADMIN_GET_ALL: {
			PATH: '`api/admin/reservations`',
			METHOD: httpMethods.GET
		},
		CONFIRM: {
			PATH: '`api/reservations/${URLParams.reservationID}/confirm`',
			METHOD: httpMethods.POST
		},
		CREATE: {
			PATH: '`api/elements/${URLParams.elementID}/reservations`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/reservations/${URLParams.reservationID}`',
			METHOD: httpMethods.DELETE
		},
		GET_ALL_BY_ELEMENT: {
			PATH: '`api/elements/${URLParams.elementID}/reservations?date=${URLParams.date}`',
			METHOD: httpMethods.GET
		},
		GET_ALL_BY_USER: {
			PATH: '`api/users/${URLParams.userID}/reservations`',
			METHOD: httpMethods.GET
		},
		GET_BY_ID: {
			PATH: '`api/reservations/${URLParams.reservationID}`',
			METHOD: httpMethods.GET
		},
		UPDATE: {
			PATH: '`api/reservations/${URLParams.reservationID}`',
			METHOD: httpMethods.PUT
		}
	},
	ROOM: {
		CREATE: {
			PATH: '`api/spaces/${URLParams.spaceID}/rooms`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/rooms/${URLParams.roomID}`',
			METHOD: httpMethods.DELETE
		},
		GET_ALL: {
			PATH: '`api/spaces/${URLParams.spaceID}/rooms`',
			METHOD: httpMethods.GET
		},
		GET_BY_ID: {
			PATH: '`api/rooms/${URLParams.roomID}`',
			METHOD: httpMethods.GET
		},
		UPDATE: {
			PATH: '`api/rooms/${URLParams.roomID}`',
			METHOD: httpMethods.PUT
		}
	},
	SPACE: {
		CREATE: {
			PATH: '`api/spaces`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/spaces/${URLParams.spaceID}`',
			METHOD: httpMethods.DELETE
		},
		GET_ALL: {
			PATH: '`api/spaces`',
			METHOD: httpMethods.GET
		},
		GET_BY_ID: {
			PATH: '`api/spaces/${URLParams.spaceID}`',
			METHOD: httpMethods.GET
		},
		UPDATE: {
			PATH: '`api/spaces/${URLParams.spaceID}`',
			METHOD: httpMethods.PUT
		}
	},
	TOOL: {
		ADD_MANUAL: {
			PATH: '`api/tools/${URLParams.toolID}/manual`',
			METHOD: httpMethods.POST
		},
		CREATE: {
			PATH: '`api/spaces/${URLParams.spaceID}/tools`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/tools/${URLParams.toolID}`',
			METHOD: httpMethods.DELETE
		},
		GET_ALL: {
			PATH: '`api/spaces/${URLParams.spaceID}/tools`',
			METHOD: httpMethods.GET
		},
		GET_BY_ID: {
			PATH: '`api/tools/${URLParams.toolID}`',
			METHOD: httpMethods.GET
		},
		REMOVE_MANUAL: {
			PATH: '`api/tools/${URLParams.toolID}/manual`',
			METHOD: httpMethods.DELETE
		},
		UPDATE: {
			PATH: '`api/tools/${URLParams.toolID}`',
			METHOD: httpMethods.PUT
		}
	},
	USER: {
		CREATE: {
			PATH: '`api/users`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/users/${URLParams.userID}`',
			METHOD: httpMethods.DELETE
		},
		GET_ALL: {
			PATH: '`api/users`',
			METHOD: httpMethods.GET
		},
		GET_BY_ID: {
			PATH: '`api/users/${URLParams.userID}`',
			METHOD: httpMethods.GET
		},
		LOGIN: {
			PATH: '`api/login`',
			METHOD: httpMethods.POST
		},
		LOGOUT: {
			PATH: '`api/logout`',
			METHOD: httpMethods.POST
		},
		REGISTER: {
			PATH: '`api/register`',
			METHOD: httpMethods.POST
		},
		UPDATE: {
			PATH: '`api/users/${URLParams.userID}`',
			METHOD: httpMethods.PUT
		}
	}
};
