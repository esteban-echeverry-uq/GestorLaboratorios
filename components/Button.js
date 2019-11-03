import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({title, action}) => {

    return (
        <TouchableOpacity style={styles.item} onPress={() => action(title)}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({ 
    item: {
        display: "flex",
        backgroundColor: '#005499',
        borderStyle: 'solid',
        borderColor: '#013e70',
        borderWidth: 4,
        borderRadius: 4,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    title: {
        color: 'white',
        fontSize: 14,
    },
});

export default Button;