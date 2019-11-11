import React, {Component} from "react";
import { Button, StyleSheet } from "react-native";
import {Actions} from "react-native-router-flux";

export default class MenuButton extends Component {
	openDrawer() {
		Actions.menuDrawer();
	}

	render() {
		return (
			<Button style={styles.container} onPress={this.openDrawer} title='menú' />
		);
	}
}

const styles = StyleSheet.create({
    container: {
		fontSize: 5,
	}
});
