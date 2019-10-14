import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ListItem from '../../components/ListItem';
import axios from 'axios';

class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            spaces: []
        };
    }

    componentDidMount(){
        axios.get('https://gestor-laboratorios.herokuapp.com/api/spaces')
        .then((response) =>{
            this.setState({
                spaces: response.data.spaces
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        let {spaces} = this.state;
        return(
            spaces.length > 0 &&
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={spaces}
                    renderItem={({ item }) => <ListItem title={item.name} />}
                    keyExtractor={item => item._id}
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

export default Index