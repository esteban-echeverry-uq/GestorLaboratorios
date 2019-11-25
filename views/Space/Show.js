import React, { Component, Fragment } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TabView, TabBar } from 'react-native-tab-view';
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
    };

    goToSpaceIndex = () => {
        Actions.spacesIndex({ changed: true })
    };

    goToCreateRoom = (spaceData) => {
        Actions.createRoom({
            spaceData,
            submitText: 'Crear Sala'
        })
    };

    goToCreateTool = (spaceData) => {
        Actions.createTool({
            spaceData,
            submitText: 'Crear Herramienta'
        })
    };

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
    };

    render(){
        let {spaceData, currentUser} = this.props;

        return (
            <Fragment>
                { currentUser.role === 'admin' && 
                    <>
                    <View style={styles.horizontal}>
                        <Button title="Editar Espacio" action={() => this.goToEditSpace(spaceData)} bgColor='blue' />
                        <Button title="Eliminar Espacio" action={this.deleteSpace} bgColor='red'/>
                    </View>
                    <View style={styles.horizontal}>
                        <Button title="Crear Sala" action={() => this.goToCreateRoom(spaceData)} bgColor='blue' />
                        <Button title="Crear Herramienta" action={() => this.goToCreateTool(spaceData)} bgColor='blue' />
                    </View>
                    </>
                }
                <TabView
                    navigationState={this.state}
                    renderScene ={ ({ route }) => {
                        switch (route.key) {
                            case 'rooms':
                                return <Rooms spaceData={spaceData} currentUser={currentUser} />;
                            case 'tools':
                                return <Tools spaceData={spaceData} currentUser={currentUser} />;
                            default:
                                return null;
                        }
                    }}
                    renderTabBar={props =>
                        <TabBar
                          {...props}
                          indicatorStyle={{ backgroundColor: '#219132', height:5 }}
                          style={{ backgroundColor: '#176623' }}
                        />
                      }
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
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10
    }
});

export default Show
