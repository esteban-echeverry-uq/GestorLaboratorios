import React, {Component} from "react";
import {Button, Text, View} from "react-native";
import {Actions} from "react-native-router-flux";

const SessionService = require('../services/sessionService');
const sessionService = new SessionService();

export default class DrawerContent extends Component {
	logout() {
		sessionService.logout().then(response => {
			if (response.status === 'success') {
				Actions.login();
			}
		});
	}

	render() {
		return (
			<View>
				<Button onPress={this.logout} title='Cerrar Sesión' />
			</View>
		);
	}
}
