import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import Button from "../../components/Button";

const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

class MyReservations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reservations: [],
			rooms: [],
			tools: [],
			firstTime: false
		};
	}

	componentDidMount() {
		this.setReservations();
	}

	setReservations() {
		const { currentUser } = this.props;

		if (currentUser.role === 'admin'){
			reservationService.getAll()
			.then(response => {
				if (response.status === 'success') {
					this.setState({ reservations: response.reservations });
					let rooms = []; 
					let tools = [];
					response.reservations.map((reservation) => {
						if(reservation.elementType === 'Rooms'){
							rooms.push(reservation)
						}else{
							tools.push(reservation)
						}
					});
					this.setState({rooms,tools, firstTime: true})
				}
				else {
					console.warn(response.message);
				}
			});
		}
		else{
			reservationService.getAllByUser(this.props.currentUser._id)
			.then(response => {
				if (response.status === 'success') {
					this.setState({ reservations: response.reservations });
					let rooms = []; 
					let tools = [];
					response.reservations.map((reservation) => {
						if(reservation.elementType === 'Rooms'){
							rooms.push(reservation)
						}else{
							tools.push(reservation)
						}
					});
					this.setState({rooms,tools, firstTime: true})
				}
				else {
					console.warn(response.message);
				}
			});
		}
	}

	confirmReservation(reservation) {
		reservationService.confirm(reservation).then(response => {
			if (response.status === 'success') {
				this.setReservations();
			}
			else {
				console.warn(response.message);
			}
		});
	}

	deleteReservation(reservation) {
		reservationService.delete(reservation).then(response => {
			if (response.status === 'success') {
				this.setReservations();
			}
			else {
				console.warn(response.message);
			}
		});
	}

	renderReservationActions(reservation) {
		return (
			<View style={[styles.horizontal]}>
				<Button
					action={() => this.confirmReservation(reservation)}
					bgColor='blue'
					title='Confirmar'
					style={styles.tableButton}
				/>
				<Button
					action={() => this.deleteReservation(reservation)}
					bgColor='red'
					title='Cancelar'
					style={styles.tableButton}
				/>
			</View>
		);
	}

	renderReservations(reservationList){
		return reservationList.map(reservation => {
			console.warn(reservation)
			return (
				<View key={reservation._id} style={styles.marginTop}>
					<Text style={[styles.box, styles.headingBox]}>{reservation.element.name}</Text>
					<View style={styles.horizontal} >
						<Text style={[styles.box]}>{`${reservation.startTime}:00`}</Text>
						<Text style={[styles.box]}>{`${reservation.endTime+1}:00`}</Text>
					</View>
					{reservation.status === 'pending' && this.renderReservationActions(reservation)}
				</View>
			)
		})
	}
	
	render() {
		const { rooms, tools } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.container}>
					<Text style={styles.title}>Reservas de Salas</Text>
					{this.renderReservations(rooms)}
					<Text style={[styles.title, styles.marginTop]}>Reservas de Herramientas</Text>
					{this.renderReservations(tools)}
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
		textAlign: 'center'
    },
    box:{
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        display: 'flex',
        flex: 0.5,
        padding: 10,
		textAlign: 'center',
	},
	headingBox: {
		backgroundColor: '#176623',
		color: 'white',
	},
	tableButton: {
		marginVertical: 0,
		marginHorizontal:0,
		borderRadius: 0,
		borderWidth: 1,
		flex: 1
	},
	marginTop: {
		marginTop: 30
	},
	marginBottom: {
		marginBottom: 10
	},
	title: {
		fontSize: 24,
	}
});

export default MyReservations;
