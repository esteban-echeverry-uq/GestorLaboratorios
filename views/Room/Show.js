import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
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
                console.warn(response.message);
            }
        });
    }

    goToCreateReservation(){
        Actions.createReservation({
            elementData: this.props.roomData,
            submitText: 'Crear Reserva'
        })
    }

    scheduleItem(i, reservationStatus){
        return (
            <View style={styles.horizontal} key={i}>
                <Text style={styles.box}>{`${i}:00`}</Text>
                <Text style={styles.box}>{reservationStatus}</Text>
            </View>
        )
    }

    renderReservations(){
        let reservations=[];
        for(let i=7; i <= 22; i++){
            const existingReservation = this.state.reservations.filter( (reservation) => reservation.startTime === i);
            if(existingReservation.length){
                let reservationStatus = existingReservation[0].status === 'pending' ? 'Por Confirmar' : 'Reservado'
                reservations.push(this.scheduleItem(i,reservationStatus))
             }else{
                reservations.push(this.scheduleItem(i,'Disponible'))
            }
        }
        return reservations.map((reservation) => reservation)
    }
    
    render(){
        return (
            <SafeAreaView>
            <ScrollView>
                {this.renderReservations()}
                <Button title='Crear Reserva' action={() => this.goToCreateReservation()} />
            </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection:'row',
        flexWrap:'wrap',
    },
    box:{
        borderColor: 'black',
        borderWidth: 1,
        display: 'flex',
        flex: 0.5,
        padding: 10,
        textAlign: 'center'
    }
});

export default Show
