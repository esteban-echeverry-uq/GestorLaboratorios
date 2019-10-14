import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItem = ({title}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({ 
    item: {
        backgroundColor: '#209031',
        borderStyle: 'solid',
        borderColor: '#176623',
        borderWidth: 4,
        borderRadius: 4,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        color: 'white',
        fontSize: 32,
    },
});

export default ListItem;