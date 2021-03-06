import React, { Component } from 'react';
import { 
    Text,
    TextInput, 
    View, 
    StyleSheet,
} from 'react-native';
import Button from '../../components/Button';
import axios from 'axios';
import { Actions } from "react-native-router-flux";
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class SpaceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            errorMessage: null
        };
    }

    goToSpacesIndex() {
        Actions.reset('spacesIndex');
    }

    updateValue(text,field){
        this.setState({
            [field]: text
        })
    }

    submit(){
        if(this.state.name === ''){
            this.setState({ errorMessage: 'El campo no puede estar vacio'})
            return
        }
        let ENDPOINT, url;
        if (this.props.action === 'edit'){
            ENDPOINT = endpoints.SPACE.UPDATE;
            url = endpointGenerator(ENDPOINT.PATH, {spaceID: this.props.spaceData._id});
        } else{
            ENDPOINT = endpoints.SPACE.CREATE;
            url = endpointGenerator(ENDPOINT.PATH);
        }
        axios({
            method: ENDPOINT.METHOD,
            url,
            data:  {...this.state}
        }).then(() => {
            Actions.spacesIndex();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let {spaceData} = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                <TextInput
                    placeholder={spaceData ? spaceData.name : "Nombre del espacio"}
                    style={styles.textInput}
                    onChangeText={(text) => this.updateValue(text,'name')}
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
    errorMessage: {
        color: 'white',
        marginBottom: 20
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

export default SpaceForm
