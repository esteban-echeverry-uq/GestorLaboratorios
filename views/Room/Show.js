import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'

const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

const RoomService = require('../../services/roomService');
const roomService = new RoomService();

const SessionService = require('../../services/sessionService');
const sessionService = new SessionService();

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            date: moment().format('YYYY-MM-DD'),
            reservations: []
        }
    }

    componentDidMount(){
        this.getReservations(moment().format('YYYY-MM-DD'));
        this.setCurrentUser();
    }

    setCurrentUser() {
        sessionService.getCurrentUser().then(response => {
            if (response.status === 'success') {
                this.setState({ currentUser: response.currentUser });
                Actions.refresh();
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reservationCreated && this.props.reservationCreated !== prevProps.reservationCreated) {
            this.getReservations(this.state.date);
            Actions.refresh({ reservationCreated: false });
        }
        if (this.props.changed !== prevProps.changed) {
            Actions.pop({ changed: true });
        }
    }

    getReservations(date) {
        reservationService.getAllByElement(this.props.roomData._id, date).then(response => {
            if (response.status === 'success') {
                this.setState({
                    reservations: response.reservations,
                    date
                });
            }
            else {
                console.warn(response);
            }
        });
    }

    goToCreateReservation(date){
        let elementData = {...this.props.roomData, date};
        Actions.createReservation({
            elementData,
            submitText: 'Crear Reserva',
            elementType: 'Rooms'
        })
    }

    goToEditRoom = (spaceData) => {
        Actions.editRoom({
            spaceData,
            roomData: this.props.roomData,
            submitText: 'Editar Sala',
            action: 'edit'
        })
    };

    deleteRoom = () => {
        let {roomData, spaceData} = this.props;
        roomService.delete(roomData)
        .then((response) => {
            if(response.status === 'success'){
                Actions.pop();
                setTimeout(() => Actions.refresh({ changed: true }));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

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
        const { currentUser, date } = this.state;

        return (
            <SafeAreaView>
                <ScrollView>
                    { currentUser && currentUser.role === 'admin' &&
                        <View style={[styles.horizontal, styles.container]}>
                            <Button title='Editar Sala' action={() => this.goToEditRoom(this.props.spaceData)} bgColor='blue' />
                            <Button title='Eliminar Sala' action={this.deleteRoom} bgColor='red'/>
                        </View>
                    }
                    <View style={{display: 'flex', alignItems: 'center'}}>
                        <Text style={styles.calendarHeader}>Fecha</Text>
                        <DatePicker
                            style={{width: 200, marginBottom: 20}}
                            date={this.state.date}
                            mode='date'
                            placeholder='Seleccionar Fecha'
                            format='YYYY-MM-DD'
                            confirmBtnText='Confirmar'
                            cancelBtnText='Cancelar'
                            customStyles={{
                            dateIcon: {
                                display: 'none'
                            },
                            dateInput: {
                                borderColor: 'black',
                                backgroundColor: 'white'
                            }
                            }}
                            onDateChange={(date) => {this.getReservations(date)}}
                        />
                    </View>
                    { moment().format('YYYY-MM-DD') <= date && 
                        <Button title='Crear Reserva' action={() => this.goToCreateReservation(date)} bgColor='green'/>
                    }
                    {this.renderReservations()}
                    { moment().format('YYYY-MM-DD') <= date && 
                        <Button title='Crear Reserva' action={() => this.goToCreateReservation(date)} bgColor='green'/>
                    }
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
        textAlign: 'center',
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
    calendarHeader: {
        width: 200,
        backgroundColor: '#cc0000',
        color: 'white',
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        padding: 5
    },
    available:{
        backgroundColor: '#13531d'
    },
    pending: {
        backgroundColor: '#e6b800'
    },
    reserved: {
        backgroundColor: '#cc0000'
    }
});

export default Show
