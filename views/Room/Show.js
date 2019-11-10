import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Button from '../../components/Button';
import Rooms from '../Room/Index'
import Tools from '../Tool/Index'
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render(){
        return (
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection:'row',
        flexWrap:'wrap',
    }
});

export default Show