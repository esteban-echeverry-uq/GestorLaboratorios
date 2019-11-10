import React, { Component, Fragment } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TabView } from 'react-native-tab-view';
import axios from 'axios';
import Button from '../../components/Button';
import Rooms from '../Room/index'
import Tools from '../Tool/index'
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'rooms', title: 'Salas' },
                { key: 'tools', title: 'Herramientas' }
            ]
        }
    }
    
    goToEditSpace = (spaceData) => {
        Actions.editSpace({
            spaceData,
            title: spaceData.name,
            submitText: 'Editar Espacio',
            action: 'edit'
        })
    }

    goToSpaceIndex = () => {
        Actions.spacesIndex()
    }

    deleteSpace = () => {
        const ENDPOINT = endpoints.SPACE.DELETE;
        const url = endpointGenerator(ENDPOINT.PATH, {spaceID: this.props.spaceData._id});
        axios({
            method: ENDPOINT.METHOD,
            url
        })
        .then( () => {
            this.goToSpaceIndex()
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render(){
        return (
            <Fragment>
                <View style={styles.horizontal}>
                    <Button title="Editar Espacio" action={() => this.goToEditSpace(this.props.spaceData)}/>
                    <Button title="Eliminar Espacio" action={this.deleteSpace}/>
                </View>
                <View style={styles.horizontal}>
                    <Button title="Crear Sala" action={this.goToCreateRoom}/>
                    <Button title="Crear Herramienta" action={this.deleteSpace}/>
                </View>
                <TabView
                    navigationState={this.state}
                    renderScene ={ ({ route }) => {
                        switch (route.key) {
                            case 'rooms':
                                return <Rooms spaceData={this.props.spaceData} />;
                            case 'tools':
                                return <Tools spaceData={this.props.spaceData} />;
                            default:
                                return null;
                        }
                    }}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
            </Fragment>
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