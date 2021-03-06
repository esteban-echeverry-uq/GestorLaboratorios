import React, { Component } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';
import axios from 'axios';
const endpoints = require('../../configs/constants/endpoints');
const endpointGenerator = require('../../helpers/endpointURLGenerator');

const SessionService = require('../../services/sessionService');
const sessionService = new SessionService();

class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            spaces: [],
            loading: true
        };
    }

    componentDidMount(){
       this.getSpaces();
       this.setCurrentUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.changed !== prevProps.changed) {
            this.getSpaces();
        }
    }

    setCurrentUser() {
        sessionService.getCurrentUser().then(response => {
            if (response.status === 'success') {
                this.setState({ currentUser: response.currentUser });
            }
        });
    }

    getSpaces = () => {
        const ENDPOINT = endpoints.SPACE.GET_ALL;
        const url = endpointGenerator(ENDPOINT.PATH);
        axios({
            method: ENDPOINT.METHOD,
            url
        })
            .then((response) => {
                this.setState({
                    spaces: response.data.spaces,
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    goToShowSpace = (spaceData) => {
        Actions.showSpace({
            spaceData,
            title: spaceData.name,
        })
    };

    goToCreateSpace = () => {
        Actions.createSpace({submitText: "Crear Espacio"})
    };

    render(){
        const { currentUser, spaces, loading } = this.state;

        return(
            <>
                { currentUser && currentUser.role === 'admin' &&
                    <View style={styles.horizontal}>
                        <Button title="Crear Espacio" action={this.goToCreateSpace} bgColor='blue'/>
                    </View>
                }
                { loading && 
                    <View style={[styles.container, styles.center]}>
                        <ActivityIndicator size="large" color="#176623" />
                    </View>
                }
                { spaces.length > 0 &&
                    <View>
                        <FlatList
                            data={spaces}
                            renderItem={({ item }) => <ListItem item={item} action={this.goToShowSpace} />}
                            keyExtractor={item => item._id}
                        />
                    </View>
                }
                {   spaces.length == 0 && loading == false &&
                    <Text style={[styles.container, styles.center]}>
                        No hay facultades para mostrar
                    </Text>
                }
            </>
        );
    } 
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection:'row',
        flexWrap:'wrap',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    center: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default Index
