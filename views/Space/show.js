import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ListItem from '../../components/ListItem'

class Show extends Component {
    
    render(){
        const DATA = [
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'First Item',
            }
        ];

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <ListItem title={this.props.title} />}
                    keyExtractor={item => item.id}
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