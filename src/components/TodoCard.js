import React, { Component } from 'react';
import { Card, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { displays } from '../utils/constants';


export default TodoCard = (props) => {

    return (
        <Card style={styles.container}>
            <Card.Content style={{flexDirection: 'row'}}>
                <View style={styles.title}>
                <Text>{props.title}</Text>
                <Text>{props.status ? displays.completed : displays.not_completed}</Text>
                </View>
                <View style={styles.action}>
                    <FontAwesome
                        size={16}
                        color="#000000" 
                        name={"edit"}
                        onPress={props.onHandleEdit}
                    />  
                    <FontAwesome
                    style={styles.deleteAction}
                        size={16}
                        color="#000000" 
                        name={"trash"}
                        onPress={props.onHandleDelete}
                    />        
                </View>
            </Card.Content>
        </Card>
    )     

 }

 const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    title: {
        flex: 1,

    },
    action: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    editAction: {

        
    },
    deleteAction: {
        marginLeft: 5
    }
 })