import React, {Component} from "react";
import { Button } from "react-native";
import {Actions} from "react-native-router-flux";

export default class MenuButton extends Component {
	openDrawer() {
		Actions.drawer();
	}

	render() {
		return (
			<Button onPress={this.openDrawer} title='MENU' />
		);
	}
}
