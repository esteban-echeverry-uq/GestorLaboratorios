import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({title, action, bgColor}) => {
    let getColor = (color) => {
        switch(color){
            case 'blue':
                return styles.blueBtn
            case 'red':
                return styles.redBtn
            case 'green':
                return styles.greenBtn
        }
    }
    
    return (
        <TouchableOpacity 
        style={[styles.item, getColor(bgColor)]}
        onPress={() => action(title)}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({ 
    item: {
        display: "flex",
        borderStyle: 'solid',
        borderWidth: 4,
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    blueBtn: {
        borderColor: '#013e70',
        backgroundColor: '#005499'
    },
    redBtn: {
        backgroundColor: '#cc0000',
        borderColor: '#660000'
    },
    greenBtn: {

    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
    },
});

export default Button;