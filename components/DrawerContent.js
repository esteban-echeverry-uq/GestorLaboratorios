import React, {Component} from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import Button from "./Button";

export default class DrawerContent extends Component {
	goTo(component) {
		Actions.reset(component);
	}

	renderLoggedOutButtons() {
		return (
			<>
				<Button action={() =>this.goTo('login')} title='Iniciar Sesión' />
			</>
		);
	}

	renderLoggedButtons() {
		return (
			<>
				<Button action={() => this.goTo('myReservations')} title='Mis Reservaciones' bgColor='green'/>
				<Button action={() => this.goTo('spacesIndex')} title='Facultades' bgColor='green'/>
				<Button action={this.props.logout} title='Cerrar Sesión' bgColor='red'/>
			</>
		);
	}

	render() {
		const { currentUser } = this.props;

		return (
			<View>
				{
					currentUser ?
						this.renderLoggedButtons() :
						this.renderLoggedOutButtons()
				}
			</View>
		);
	}
}
