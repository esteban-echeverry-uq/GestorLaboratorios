import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ListItem from '../../components/ListItem'
import axios from 'axios';
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: []
        };
    }

    componentDidMount(){
        const ENDPOINT = endpoints.TOOL.GET_ALL;
        const url = endpointGenerator(ENDPOINT.PATH, { spaceID: this.props.spaceData._id});
        axios({
            method: ENDPOINT.METHOD,
            url
        })
        .then((response) => {
            this.setState({
                tools: response.data.tools
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render(){
        let {tools} = this.state;
        return (
            tools.length > 0 &&
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.tools}
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

export default Tools