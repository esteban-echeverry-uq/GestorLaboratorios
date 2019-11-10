import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Button from '../../components/Button';
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        }
    }

    componentDidMount(){
        const ENDPOINT = endpoints.RESERVATION.GET_ALL_BY_ELEMENT;
        const url = endpointGenerator(ENDPOINT.PATH, {elementID: this.props.roomData._id});
        axios({
            method: ENDPOINT.METHOD,
            url
        })
        .then((response) => {
            this.setState({
                reservations: response.data.reservations
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    goToCreateReservation(){
        Actions.createReservation({
            elementData: this.props.roomData,
            submitText: 'Crear Reserva'
        })
    }

    renderReservations(){
        return this.state.reservations.map( (reservation) => <Text>{reservation}</Text>)
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