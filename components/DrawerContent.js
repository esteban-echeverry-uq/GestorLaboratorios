import React, {Component} from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import Button from "./Button";

const SessionService = require('../services/sessionService');
const sessionService = new SessionService();

export default class DrawerContent extends Component {
	state = {
		currentUser: undefined
	};

	componentDidMount() {
		this.setCurrentUser();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!this.props.currentUser && this.props.currentUser !== prevProps.currentUser) this.updateCurrentUser(undefined);
		if (this.props.currentUser && this.props.currentUser !== prevProps.currentUser) this.updateCurrentUser(this.props.currentUser);
	}

	setCurrentUser() {
		sessionService.getCurrentUser().then(response => {
			if (response.status === 'success') {
				this.updateCurrentUser(response.currentUser);
			}
		});
	}

	updateCurrentUser(currentUser) {
		this.setState({ currentUser });
	}

	goTo(component) {
		Actions[component](component);

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
				<Button action={() => this.goTo('myReservations')} title='Mis Reservas' bgColor='green'/>
				<Button action={() => this.goTo('spacesIndex')} title='Facultades' bgColor='green'/>
				<Button action={this.props.logout} title='Cerrar Sesión' bgColor='red'/>
			</>
		);
	}

	render() {
		const { currentUser } = this.state;

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
