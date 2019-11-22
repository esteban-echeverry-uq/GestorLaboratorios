import React, { Component } from 'react';
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';
const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

const ToolService = require('../../services/toolService');
const toolService = new ToolService();

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        }
    }

    componentDidMount() {
        reservationService.getAllByElement(this.props.toolData._id).then(response => {
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

    goToEditTool = (spaceData) => {
        Actions.editTool({
            spaceData,
            toolData: this.props.toolData,
            submitText: 'Editar Herramienta',
            action: 'edit'
        })
    }

    deleteTool= () =>{
        let {toolData, spaceData} = this.props;
        toolService.delete(toolData)
        .then((response) => {
            console.warn(response)
            if(response.status === 'success'){
                Actions.showSpace({spaceData, title: spaceData.name})
            }
        })
        .catch(function (error) {
            console.log(error);
        });
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
            const existingReservation = this.state.reservations.filter( (reservation) => reservation.startTime <= i && i <= reservation.endTime);
            if(existingReservation.length){
                let reservationStatus = existingReservation[0].status === 'pending' ? 'Por Confirmar' : 'Reservado'
                reservations.push(this.scheduleItem(i,reservationStatus))
             }else{
                reservations.push(this.scheduleItem(i,'Disponible'))
            }
        }
        return reservations.map((reservation) => reservation)
    }

    goToCreateReservation(){
        Actions.createReservation({
            elementData: this.props.toolData,
            submitText: 'Crear Reserva',
            elementType: 'Tools'
        })
    }

    render(){
        let { currentUser } = this.props
        return (
            <SafeAreaView>
                <ScrollView>
                    { currentUser &&
                        <View style={[styles.horizontal, styles.container]}>
                                <Button title="Editar Herramienta" action={() => this.goToEditTool(this.props.spaceData)} bgColor='blue' />
                                <Button title="Eliminar Herramienta" action={this.deleteTool} bgColor='red'/>
                        </View>
                    }
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
