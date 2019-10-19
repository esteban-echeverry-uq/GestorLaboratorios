const httpMethods = require('./httpMethods');


module.exports = {
	USER: {
		CREATE: {
			PATH: '`api/users`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/users/${URLParams.userID}`',
			METHOD: httpMethods.DELETE
		},
		UPDATE: {
			PATH: '`api/users/${URLParams.userID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/users/${URLParams.userID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL: {
			PATH: '`api/users`',
			METHOD: httpMethods.GET
		},
		LOGIN: {
			PATH: '`api/login`',
			METHOD: httpMethods.POST
		},
		REGISTER: {
			PATH: '`api/register`',
			METHOD: httpMethods.POST
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
		UPDATE: {
			PATH: '`api/spaces/${URLParams.spaceID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/spaces/${URLParams.spaceID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL: {
			PATH: '`api/spaces`',
			METHOD: httpMethods.GET
		},
	},
	ROOM: {
		CREATE: {
			PATH: '`api/spaces/${URLParams.spaceID}/rooms`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/spaces/${URLParams.spaceID}/rooms/${URLParams.roomID}`',
			METHOD: httpMethods.DELETE
		},
		UPDATE: {
			PATH: '`api/spaces/${URLParams.spaceID}/rooms/${URLParams.roomID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/spaces/${URLParams.spaceID}/rooms/${URLParams.roomID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL: {
			PATH: '`api/spaces/${URLParams.spaceID}/rooms`',
			METHOD: httpMethods.GET
		},
	},
	TOOL: {
		CREATE: {
			PATH: '`api/spaces/${URLParams.spaceID}/tools`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/spaces/${URLParams.spaceID}/tools/${URLParams.toolID}`',
			METHOD: httpMethods.DELETE
		},
		UPDATE: {
			PATH: '`api/spaces/${URLParams.spaceID}/tools/${URLParams.toolID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/spaces/${URLParams.spaceID}/tools/${URLParams.toolID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL: {
			PATH: '`api/spaces/${URLParams.spaceID}/tools`',
			METHOD: httpMethods.GET
		},
	},
	RESERVATION: {
		ADMIN_GET_ALL: {
			PATH: '`api/admin/reservations`',
			METHOD: httpMethods.GET
		},
		CREATE: {
			PATH: '`api/elements/${URLParams.elementID}/reservations`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/elements/${URLParams.elementID}/reservations/${URLParams.reservationID}`',
			METHOD: httpMethods.DELETE
		},
		UPDATE: {
			PATH: '`api/elements/${URLParams.elementID}/reservations/${URLParams.reservationID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/elements/${URLParams.elementID}/reservations/${URLParams.reservationID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL_BY_ELEMENT: {
			PATH: '`api/elements/${URLParams.elementID}/reservations`',
			METHOD: httpMethods.GET
		},
		GET_ALL_BY_USER: {
			PATH: '`api/users/${URLParams.userID}/reservations`',
			METHOD: httpMethods.GET
		}
	}
};
