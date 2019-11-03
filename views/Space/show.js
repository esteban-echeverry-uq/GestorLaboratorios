import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ListItem from '../../components/ListItem'
import axios from 'axios';
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
    }

    componentDidMount(){
        const ENDPOINT = endpoints.ROOM.GET_ALL;
        const url = endpointGenerator(ENDPOINT.PATH, { spaceID: this.props.spaceData._id});
        axios({
            method: ENDPOINT.METHOD,
            url
        })
        .then((response) => {
            console.warn("response", response.data);
            this.setState({
                rooms: response.data.rooms
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render(){
        let {rooms} = this.state;
        console.warn(this.state)
        return (
            rooms.length > 0 &&
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.rooms}
                    renderItem={({item}) => <ListItem item={item} action={() => console.log("click")} />}
                    keyExtractor={item => item._id}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
});

export default Show