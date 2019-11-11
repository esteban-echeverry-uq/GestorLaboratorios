import React, {Component} from "react";
import {Text, View} from "react-native";

const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

class MyReservations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reservations: []
		};
	}

	componentDidMount() {
		const { currentUser } = this.props;

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

export default MyReservations;
