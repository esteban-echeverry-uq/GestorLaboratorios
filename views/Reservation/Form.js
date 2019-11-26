import React, { Component } from 'react';
import {
    View, 
    StyleSheet,
    Text
} from 'react-native';
import Button from '../../components/Button';
import { Dropdown } from 'react-native-material-dropdown';
import dropDownData from './dropDown';
import { Actions } from "react-native-router-flux";
import moment from 'moment'

const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

const SessionService = require('../../services/sessionService');
const sessionService = new SessionService();

class ReservationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            name: '',
            startTime: null,
            endTime: null,
            errorText: ''
        };
    }

    componentDidMount(){
        this.setCurrentUser();
    }

    setCurrentUser() {
        sessionService.getCurrentUser().then(response => {
            if (response.status === 'success') {
                this.setState({ currentUser: response.currentUser });
            }
        });
    }

    goToShowElement() {
        Actions.pop();
        setTimeout(() => Actions.refresh({ reservationCreated: true }));
    }

    updateValue(text,field){
        this.setState({
            [field]: text
        })
    }

    submit(){
        const { currentUser, startTime,endTime } = this.state;
        const { elementData, elementType } = this.props;

        if(startTime > endTime){
            this.setState({errorText: 'La hora de fin debe ser mayor a la de inicio'})
            return
        }
        reservationService.create({
            ...this.state,
            date: elementData.date,
            userID: currentUser._id,
            element: elementData._id,
            elementType
        }).then((response) => {
            if (response.status == 'success'){
                this.goToShowElement();
            }else{
                console.warn(response.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let { elementData } = this.props
        let filteredDropDowndata;

        if (moment().format('YYYY-MM-DD') === elementData.date ){
            filteredDropDowndata = dropDownData.filter((data) => moment().format('H') < data.value)
        }
        else {
            filteredDropDowndata = dropDownData
        }

        return(
            <View style={styles.container}>
                <Text style={{color: 'white', marginBottom: 20}}>{this.state.errorText}</Text>
                <Dropdown
                    label='Hora de Inicio'
                    data={filteredDropDowndata}
                    baseColor='white'
                    textColor='white'
                    selectedItemColor='black'
                    onChangeText={(value) => {
                        this.setState({
                            startTime: value
                        })
                    }}
                />
                <Dropdown
                    label='Hora de Fin'
                    data={filteredDropDowndata}
                    baseColor='white'
                    textColor='white'
                    selectedItemColor='black'
                    onChangeText={(value) => {
                        this.setState({
                            endTime: value-1
                        })
                    }}
                />
                <Button title={this.props.submitText} bgColor="blue" action={() => this.submit()}/>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 20,
        backgroundColor: "#209031"
    },
    textInput: {
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 5,
        height: 45,
        marginBottom: 10,
        padding: 5
    },
    button: {
        borderStyle: "solid",
        borderColor: "white",
        backgroundColor: "#176623",
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20
    },
    link: {
        textDecorationLine: "underline",
        color: "white",
        marginTop: 10,
        textAlign: "right"
    }
});

export default ReservationForm
