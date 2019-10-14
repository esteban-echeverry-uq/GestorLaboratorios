import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const ListItem = ({title}) => {

    const goToShowSpace = (title) => {
        Actions.showSpace({title})
     }

    return (
        <TouchableOpacity style={styles.item} onPress={() => goToShowSpace(title)}>
            <Text style={styles.title}>{title}</Text>
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