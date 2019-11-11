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

const SessionService = require('../../services/sessionService');
const sessionService = new SessionService();

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            newUser: {
                email: undefined,
                password: undefined
            }
        };
    }

    login() {
        sessionService.login(this.state.newUser).then(response => {
            if (response.status === 'success') {
               this.props.setCurrentUser(response.currentUser);
            }
            else {
                this.setState({ error: response.message });
            }
        });
    }

    goToSignUp() {
        Actions.signUp();
    }

    updateInputValue(input, value) {
        let newUser = Object.assign({}, this.state.newUser);
        newUser[input] = value;

        this.setState({ newUser, error: null });
    }

    render() {
        const { error, newUser } = this.state;

        return(
            <View style={styles.container}>
                {error && <Text>{error}</Text>}
                <TextInput
                    defaultValue={newUser.email}
                    onChangeText={(value) => this.updateInputValue('email', value)}
                    placeholder="Correo"
                    style={styles.textInput}
                    textContentType="emailAddress"
                    value={newUser.email}
                />
                <TextInput
                    defaultValue={newUser.password}
                    onChangeText={(value) => this.updateInputValue('password', value)}
                    placeholder="Constraseña"
                    secureTextEntry={true}
                    style={styles.textInput}
                    value={newUser.password}
                />
                <View style={styles.button}>
                    <Button title="Conectarse" color="blue" onPress={() => this.login()}/>
                </View>
                <TouchableOpacity onPress={() => this.goToSignUp()}>
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
