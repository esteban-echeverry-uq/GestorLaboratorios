import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
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
        this.getTools();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.changed && this.props.changed !== prevProps.changed) {
            Actions.refresh({ changed: false });
            this.getTools();
        }
    }

    getTools = () => {
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
    };

    goToShowTools = (toolData) => {
        Actions.showTool({
            toolData,
            spaceData: this.props.spaceData,
            title: toolData.name
        });
    };
    
    render(){
        const {tools} = this.state;

        return (
            tools.length > 0 &&
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.tools}
                    renderItem={({item}) => <ListItem item={item} action={this.goToShowTools} />}
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
