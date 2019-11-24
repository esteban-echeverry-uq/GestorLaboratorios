import React, { Component } from 'react';
import { 
    Button, 
    View, 
    StyleSheet
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import dropDownData from './dropDown';
import { Actions } from "react-native-router-flux";
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

    goToShowElement() {
        if(this.props.elementType == 'Rooms'){
            Actions.showRoom({
                roomData: this.props.elementData,
                spaceData: this.props.spaceData,
                title: this.props.elementData.name,
                changed: true
            })
        }else{
            Actions.showTool({
                toolData: this.props.elementData,
                spaceData: this.props.spaceData,
                title: this.props.elementData.name,
                changed: true
            })
        }
    }

    updateValue(text,field){
        this.setState({
            [field]: text
        })
    }

    submit(){
        let {currentUser, elementData, elementType} = this.props;

        reservationService.create({
            ...this.state,
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
