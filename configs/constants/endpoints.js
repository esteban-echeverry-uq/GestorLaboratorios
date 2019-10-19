const httpMethods = require('./httpMethods');


module.exports = {
	USER: {
		CREATE: {
			PATH: '`api/users`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/users/${options.userID}`',
			METHOD: httpMethods.DELETE
		},
		EDIT: {
			PATH: '`api/users/${options.userID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/users/${options.userID}`',
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
			PATH: '`api/spaces/${options.spaceID}`',
			METHOD: httpMethods.DELETE
		},
		EDIT: {
			PATH: '`api/spaces/${options.spaceID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/spaces/${options.spaceID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL: {
			PATH: '`api/spaces`',
			METHOD: httpMethods.GET
		},
	},
	ROOM: {
		CREATE: {
			PATH: '`api/spaces/${options.spaceID}/rooms`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/spaces/${options.spaceID}/rooms/${options.roomID}`',
			METHOD: httpMethods.DELETE
		},
		EDIT: {
			PATH: '`api/spaces/${options.spaceID}/rooms/${options.roomID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/spaces/${options.spaceID}/rooms/${options.roomID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL: {
			PATH: '`api/spaces/${options.spaceID}/rooms`',
			METHOD: httpMethods.GET
		},
	},
	TOOL: {
		CREATE: {
			PATH: '`api/spaces/${options.spaceID}/tools`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/spaces/${options.spaceID}/tools/${options.toolID}`',
			METHOD: httpMethods.DELETE
		},
		EDIT: {
			PATH: '`api/spaces/${options.spaceID}/tools/${options.toolID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/spaces/${options.spaceID}/tools/${options.toolID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL: {
			PATH: '`api/spaces/${options.spaceID}/tools`',
			METHOD: httpMethods.GET
		},
	},
	RESERVATION: {
		ADMIN_GET_ALL: {
			PATH: '`api/admin/reservations`',
			METHOD: httpMethods.GET
		},
		CREATE: {
			PATH: '`api/elements/${options.elementID}/reservations`',
			METHOD: httpMethods.POST
		},
		DELETE: {
			PATH: '`api/elements/${options.elementID}/reservations/${options.reservationID}`',
			METHOD: httpMethods.DELETE
		},
		EDIT: {
			PATH: '`api/elements/${options.elementID}/reservations/${options.reservationID}`',
			METHOD: httpMethods.PUT
		},
		GET_BY_ID: {
			PATH: '`api/elements/${options.elementID}/reservations/${options.reservationID}`',
			METHOD: httpMethods.GET
		},
		GET_ALL_BY_ELEMENT: {
			PATH: '`api/elements/${options.elementID}/reservations`',
			METHOD: httpMethods.GET
		},
		GET_ALL_BY_USER: {
			PATH: '`api/users/${options.userID}/reservations`',
			METHOD: httpMethods.GET
		}
	}
};
