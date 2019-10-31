import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ListItem from '../../components/ListItem';
import { Actions } from 'react-native-router-flux';
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
            url: url
        })
        .then((response) =>{
            this.setState({
                spaces: response.data.spaces
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    goToShowSpace = (title) => {
        Actions.showSpace({title})
    }

    render(){
        let {spaces} = this.state;

        return(
            spaces.length > 0 &&
            <View style={styles.container}>
                <FlatList
                    data={spaces}
                    renderItem={({ item }) => <ListItem title={item.name} action={this.goToShowSpace} />}
                    keyExtractor={item => item._id}
                />
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    }
});

export default Index
