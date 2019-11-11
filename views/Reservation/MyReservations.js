import React, {Component} from "react";
import {Text, View} from "react-native";

const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

export default class MyReservations extends Component {
	state = {
		reservations: []
	};

	componentDidMount() {
		const { currentUser } = this.state;

		if (currentUser) reservationService.getAllByUser(this.props.currentUser._id).then(response => {
			if (response.status === 'success') {
				this.setState({ reservations: response.reservations });
			}
			else {
				console.warn(response.message);
			}
		});
	}

	render() {
		const { reservations } = this.state;

		return (
			<View>
				{reservations.map(reservation => {
					return <Text>{reservation.startTime}</Text>;
				})}
			</View>
		);
	}
}
