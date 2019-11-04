import React, { Component } from 'react';
import { Dimensions } from 'react-native';
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
    
    render(){
        return (
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
        );
    }
}

export default Show