import React, { Component, Fragment } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';
import Rooms from '../Room/index'
import Tools from '../Tool/index'
import { TabView } from 'react-native-tab-view';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'tools', title: 'Herramientas' },
                { key: 'rooms', title: 'Salas' }
            ]
        }
    }
    
    goToEditSpace = (spaceData) => {
        Actions.editSpace({spaceData, title: spaceData.name})
    }

    goToDeleteSpace = (spaceData) => {
        Actions.showSpace({spaceData, title: spaceData.name})
    }
    
    render(){
        return (
            <Fragment>
                <View style={styles.horizontal}>
                    <Button title="Editar Espacio" action={this.goToEditSpace}/>
                    <Button title="Eliminar Espacio" action={this.goToDeleteSpace}/>
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