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
            submitText: 'Crear Reserva',
            reservationType: 'room'
        })
    }

    goToEditRoom = (spaceData) => {
        Actions.editRoom({
            spaceData,
            roomData: this.props.roomData,
            submitText: 'Editar Sala',
            action: 'edit'
        })
    }

    setReservationColor(availability){
        switch(availability){
            case 'Disponible':
                return styles.available
            case 'Por Confirmar':
                return styles.pending
            case 'Reservado':
                return styles.reserved
        }
    }

    scheduleItem(i, reservationStatus){
        return (
            <View style={styles.horizontal} key={i}>
                <Text style={styles.box}>{`${i}:00`}</Text>
                <Text style={[styles.statusBox, this.setReservationColor(reservationStatus)]}>{reservationStatus}</Text>
            </View>
        )
    }

    renderReservations(){
        let reservations=[];
        for(let i=7; i <= 22; i++){
            const existingReservation = this.state.reservations.filter( (reservation) =>  reservation.startTime <= i && i <= reservation.endTime);
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
                    <View style={[styles.horizontal, styles.container]}>
                        <Button title="Editar Sala" action={() => this.goToEditRoom(this.props.spaceData)} bgColor='blue' />
                        <Button title="Eliminar Sala" action={this.deleteSpace} bgColor='red'/>
                    </View>
                    {this.renderReservations()}
                    <Button title='Crear Reserva' action={() => this.goToCreateReservation()} bgColor='green'/>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10
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
        textAlign: 'center'
    },
    statusBox:{
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        display: 'flex',
        flex: 0.5,
        padding: 10,
        textAlign: 'center',
        color: 'white'
    },
    available:{
        backgroundColor: '#176623'
    },
    pending: {
        backgroundColor: '#e6b800'
    },
    reserved: {
        backgroundColor: '#cc0000'
    }
});

export default Show
