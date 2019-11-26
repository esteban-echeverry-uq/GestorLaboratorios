import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ListItem from '../../components/ListItem'
import axios from 'axios';
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
    }

    componentDidMount(){
        this.getRooms();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.changed !== prevProps.changed) {
            this.getRooms();
        }
    }

    getRooms = () => {
        const ENDPOINT = endpoints.ROOM.GET_ALL;
        const url = endpointGenerator(ENDPOINT.PATH, { spaceID: this.props.spaceData._id});
        axios({
            method: ENDPOINT.METHOD,
            url
        })
            .then((response) => {
                this.setState({
                    rooms: response.data.rooms
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    goToShowRoom = (roomData) => {
        Actions.showRoom({
            roomData,
            spaceData: this.props.spaceData,
            title: roomData.name,
            currentUser: this.props.currentUser
        });
    };
    
    render(){
        const {rooms} = this.state;

        return (
            rooms.length > 0 &&
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.rooms}
                    renderItem={({item}) => <ListItem item={item} action={this.goToShowRoom} />}
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

export default Rooms
