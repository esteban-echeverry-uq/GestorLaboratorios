import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';
import axios from 'axios';
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            spaces: []
        };
    }

    componentDidMount(){
        const ENDPOINT = endpoints.SPACE.GET_ALL;
        const url = endpointGenerator(ENDPOINT.PATH);
        axios({
            method: ENDPOINT.METHOD,
            url
        })
        .then((response) => {
            this.setState({
                spaces: response.data.spaces
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    goToShowSpace = (spaceData) => {
        Actions.showSpace({spaceData, title: spaceData.name})
    };

    goToCreateSpace = () => {
        Actions.createSpace({submitText: "Crear Espacio"})
    };

    render(){
        let {spaces} = this.state;
        return(
            spaces.length > 0 &&
            <View>
                <View style={styles.horizontal}>
                    <Button title="Crear Espacio" action={this.goToCreateSpace} bgColor='blue'/>
                </View>
                <FlatList
                    data={spaces}
                    renderItem={({ item }) => <ListItem item={item} action={this.goToShowSpace} />}
                    keyExtractor={item => item._id}
                />
            </View> || <Button title="Crear Espacio" action={this.goToCreateSpace}/>
        );
    } 
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection:'row',
        flexWrap:'wrap',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    }
});

export default Index
