const endpoints = require('../configs/constants/endpoints');
const endpointGenerator = require('./endpointGenerator');

const ENDPOINT = endpoints.ROOM.GET_BY_ID;
const options = {
	roomID: '1',
	spaceID: '2'
};

const url = endpointGenerator(ENDPOINT, options);
console.log(url);
