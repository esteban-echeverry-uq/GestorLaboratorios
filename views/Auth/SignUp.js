import React, { Component } from 'react';
import { 
    Button, 
    TextInput, 
    View, 
    StyleSheet, 
    Alert, 
    TouchableOpacity, 
    Text,
    Picker
} from 'react-native';
import { Actions } from "react-native-router-flux";
import axios from 'axios';
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointGenerator');

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: "estudiante"
        };
    }

    render(){
        const goToLogin = () => {
            Actions.pop()
        }

        return(
            <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder="Correo" textContentType="emailAddress" />
                <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Contraseña" />
                <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Confirmar Contraseña" />
                <Picker
                    selectedValue={ this.state.userType}
                    onValueChange={ (itemValue) => this.setState({userType: itemValue})
                    }
                >
                    <Picker.Item label="Estudiante" value="estudiante" />
                    <Picker.Item label="Docente" value="docente" />
                </Picker>
                <View style={styles.button}>
                    <Button title="Registrarse" color="white" onPress={() => Alert.alert('Simple Button pressed')}/>
                </View>
                <TouchableOpacity onPress={() => goToLogin()}>
                    <Text style={styles.link}>
                        Registrarse
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

export default SignUp