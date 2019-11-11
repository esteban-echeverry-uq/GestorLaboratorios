import React, { Component } from 'react';
import { 
    Button, 
    TextInput, 
    View, 
    StyleSheet
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import dropDownData from './dropDown';
import axios from 'axios';
import { Actions } from "react-native-router-flux";
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');
const ReservationService = require('../../services/reservationService');
const reservationService = new ReservationService();

class ReservationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            startTime: '',
            endTime: ''
        };
    }

    goToSpacesIndex() {
        Actions.spacesIndex();
    }

    updateValue(text,field){
        this.setState({
            [field]: text
        })
    }

    submit(){
        reservationService.create({
            ...this.state,
            userID: this.props.currentUser._id,
            elementID: this.props.elementData._id
        }).then((response) => {
            if (response.status == 'success'){
                Actions.spacesIndex();
            }else{
                console.warn(response)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let {spaceData} = this.props;
        return(
            <View style={styles.container}>
                <Dropdown
                    label='Hora de Inicio'
                    data={dropDownData}
                    baseColor='white'
                    textColor='white'
                    selectedItemColor='black'
                    onChangeText={(value) =>{
                        this.setState({
                            startTime: value
                        })
                    }}
                />
                <Dropdown
                    label='Hora de Fin'
                    data={dropDownData}
                    baseColor='white'
                    textColor='white'
                    selectedItemColor='black'
                    onChangeText={(value) =>{
                        this.setState({
                            endTime: value
                        })
                    }}
                />
                <View style={styles.button}>
                    <Button title={this.props.submitText} color="white" onPress={() => this.submit()}/>
                </View>
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