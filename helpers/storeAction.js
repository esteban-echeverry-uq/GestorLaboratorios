import { AsyncStorage } from 'react-native';

module.exports = {
	set: async (key, value) => {
		const jsonValue = JSON.stringify(value);
		return await AsyncStorage.setItem(key, jsonValue);
	},
	get: async (key) => {
		const jsonValue = await AsyncStorage.getItem(key);
		return JSON.parse(jsonValue);
	},
	delete: async (key) => {
		return await AsyncStorage.removeItem(key);
	}
};
