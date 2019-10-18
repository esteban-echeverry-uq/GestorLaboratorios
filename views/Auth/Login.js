import React, { Component } from 'react';
import { 
    Button, 
    TextInput, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text 
} from 'react-native';
import { Actions } from "react-native-router-flux";
import axios from 'axios';
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointGenerator');

class Login extends Component {

    render(){
        const goToSignUp = () => {
            Actions.signUp()
        }

        const goToSpacesIndex = () => {
            Actions.spacesIndex()
        }

        return(
            <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder="Correo" textContentType="emailAddress" />
                <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Constraseña" />
                <View style={styles.button}>
                    <Button title="Conectarse" color="white" onPress={() => goToSpacesIndex()}/>
                </View>
                <TouchableOpacity onPress={() => goToSignUp()}>
                    <Text style={styles.link}>
                        Crear Cuenta
                    </Text>
                </TouchableOpacity>
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

export default Login