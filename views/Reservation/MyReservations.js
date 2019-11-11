import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from "react-native";

const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

class MyReservations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reservations: [],
			rooms: [],
			tools: []
		};
	}

	componentDidMount() {
		const { currentUser } = this.props;

		if (currentUser) reservationService.getAllByUser(this.props.currentUser._id).then(response => {
			if (response.status === 'success') {
				this.setState({ reservations: response.reservations });
				let rooms = []; 
				let tools = [];
				response.reservations.map((reservation) => {
					if(reservation.elementType === 'room'){
						rooms.push(reservation)
					}else{
						tools.push(reservation)
					}
				})
				this.setState({rooms,tools})
			}
			else {
				console.warn(response.message);
			}
		});
	}

	render() {
		const { rooms } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.container}>
					<Text style={styles.title}>Reservas de Salas</Text>
					{rooms.map(reservation => {
						return (
							<View style={styles.horizontal} key={reservation._id}>
								<Text style={styles.box}>{`${reservation.startTime}:00`}</Text>
								<Text style={styles.box}>{`${reservation.endTime}:00`}</Text>
							</View>
						)
					})}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
    container:{
        padding: 10
    },
    horizontal: {
        flexDirection:'row',
        flexWrap:'wrap',
    },
    box:{
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        display: 'flex',
        flex: 0.5,
        padding: 10,
		textAlign: 'center',
		marginBottom: 10
	},
	title: {
		fontSize: 24,
		marginBottom: 10
	}
});

export default MyReservations;
