import React, { Component } from 'react';
import { 
    Button,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Picker
} from 'react-native';
import { Actions } from "react-native-router-flux";

const SessionService = require('../../services/sessionService');
const sessionService = new SessionService();

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            newUser: {
                email: undefined,
                password: undefined,
                passwordConfirmation: undefined,
                name: undefined,
                role: 'student'
            }
        };
    }

    register() {
        const { newUser } = this.state;
        if (newUser.password !== newUser.passwordConfirmation) {
            return this.setState({
                error: 'La contraseña y el campo de confirmación deben ser iguales'
            });
        }

        sessionService.register(newUser).then(response => {
            if (response.status === 'success') {
                this.props.setCurrentUser(response.currentUser);
            }
            else {
                this.setState({ error: response.message });
            }
        });
    }

    goToLogin() {
        Actions.pop();
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
                    defaultValue={newUser.name}
                    onChangeText={(value) => this.updateInputValue('name', value)}
                    style={styles.textInput}
                    placeholder="Nombre"
                    value={newUser.name}
                />
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
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    style={styles.textInput}
                    value={newUser.password}
                />
                <TextInput
                    defaultValue={newUser.passwordConfirmation}
                    onChangeText={(value) => this.updateInputValue('passwordConfirmation', value)}
                    placeholder="Confirmar Contraseña"
                    secureTextEntry={true}
                    style={styles.textInput}
                    value={newUser.passwordConfirmation}
                />
                <Picker
                    onValueChange={(value) => this.updateInputValue('role', value)}
                    selectedValue={newUser.role}
                >
                    <Picker.Item label="Estudiante" value="student" />
                    <Picker.Item label="Docente" value="teacher" />
                </Picker>
                <View style={styles.button}>
                    <Button onPress={() => this.register()} title="Registrarse" color="blue"/>
                </View>
                <TouchableOpacity onPress={() => this.goToLogin()}>
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
