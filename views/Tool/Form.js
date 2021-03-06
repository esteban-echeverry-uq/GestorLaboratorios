import React, { Component } from 'react';
import { 
    TextInput, 
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Button from '../../components/Button';
import axios from 'axios';
import { Actions } from "react-native-router-flux";
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class ToolForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            errorMessage: null
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
        let ENDPOINT, url;
        let {spaceData, toolData} = this.props;
        if (this.props.action === 'edit'){
            ENDPOINT = endpoints.TOOL.UPDATE;
            url = endpointGenerator(ENDPOINT.PATH, {toolID: toolData._id});
        } else{
            ENDPOINT = endpoints.TOOL.CREATE;
            url = endpointGenerator(ENDPOINT.PATH, {spaceID: spaceData._id});
        }
        axios({
            method: ENDPOINT.METHOD,
            url,
            data:  {...this.state, spaceID: spaceData._id}
        }).then((response) => {
            if(response.data.status === 'success'){
                Actions.popTo('showSpace');
                setTimeout(() => Actions.refresh({ changed: true }));
            }else{
                this.setState({ errorMessage: response.data.message})
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let {toolData} = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                <TextInput
                    placeholder={toolData ? toolData.name : "Nombre de la Herramienta"}
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

export default ToolForm
