import React, {Component} from "react";
import { Button, StyleSheet, View } from "react-native";
import {Actions} from "react-native-router-flux";

export default class MenuButton extends Component {
	openDrawer() {
		Actions.menuDrawer({opened: true});
	}

	render() {
		return (
			<View style={styles.container}>
				<Button style={styles.button} onPress={this.openDrawer} title='menú' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginRight: 20
	},	
    button: {
		fontSize: 5,
		marginRight: 10
	}
});
