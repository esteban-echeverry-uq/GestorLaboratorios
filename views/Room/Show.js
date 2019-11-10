import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';

const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        }
    }

    componentDidMount() {
        reservationService.getAllByElement(this.props.roomData._id).then(response => {
            if (response.status === 'success') {
                this.setState({
                    reservations: response.reservations
                });
            }
            else {
                console.warn(response.status);
            }
        });
    }

    goToCreateReservation(){
        Actions.createReservation({
            elementData: this.props.roomData,
            submitText: 'Crear Reserva'
        })
    }

    renderReservations(){
        return this.state.reservations.map( (reservation) => <Text>{reservation.status}</Text>)
    }
    
    render(){
        return (
            <View>
                {this.renderReservations()}
                <Button title='Crear Reserva' action={() => this.goToCreateReservation()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection:'row',
        flexWrap:'wrap',
    }
});

export default Show
