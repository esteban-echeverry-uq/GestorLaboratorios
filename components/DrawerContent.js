import React, {Component} from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import Button from "./Button";

export default class DrawerContent extends Component {
	goTo(component, props) {
		Actions[component](component, props | {});

	}

	renderNotLoggedButtons() {
		return (
			<>
				<Button action={() =>this.goTo('login')} title='Iniciar Sesión' />
			</>
		);
	}

	renderLoggedButtons() {
		const { currentUser } = this.props;

		return (
			<>
				<Button action={this.props.logout} title='Cerrar Sesión' />
				<Button action={() => this.goTo('myReservations', { currentUser })} title='Mis Reservaciones' />
				<Button action={() => this.goTo('spacesIndex')} title='Facultades' />
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
						this.renderNotLoggedButtons()
				}
			</View>
		);
	}
}
