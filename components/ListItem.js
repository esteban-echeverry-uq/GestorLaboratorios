import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ListItem = ({item, action}) => {

    return (
        <TouchableOpacity style={styles.item} onPress={() => action(item)}>
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
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