import React, { Component } from 'react';

import {
    FlatList, View, StyleSheet, Modal, Alert, ToastAndroid, TouchableOpacityBase 
} from 'react-native'

import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import TodoActionModal from '../components/modals/TodoActionModal';
import TodoCard from '../components/TodoCard';
import Todo from '../mappings/Todo';
import BaseScreen from './BaseScreen';

import { Portal, Button, Provider, Card, TextInput } from 'react-native-paper'
import DeleteWarningModal from '../components/modals/DeleteWarningModal';
import { displays } from '../utils/constants';

export default class TodoScreen extends BaseScreen {
 
    state = {
        todos: [],
        editMode: false,
        addMode: false,
        deleteMode: false,
        selectedItem: {},
        selectedItemIndex: 0
    }

    async componentDidMount() {
        await super.componentDidMount()
        
        let todos = await Todo.query()

        this.setState({todos})
    }
    
    showInternalError = () => {
        ToastAndroid.show(displays.internal_err, ToastAndroid.SHORT)
    }
    // add edit callbacks
    onHandleEditPress = (item, index) => {
        return () => {
            this.setState({
                selectedItem: item,
                selectedItemIndex: index,
                editMode: true
            })
        }
    }

    onHandleActionDone = (title, isDone) => {

        return async () => {
            const {
                addMode,
                editMode,
                todos
            } = this.state

            if (addMode) {
                let result = await this.addTodo(title, isDone)
                if ( result ) {
                    todos.unshift(result)
                    this.setState({
                        addMode: false, 
                        selectedItem: {}
                    })  
                } else {
                    this.showInternalError()
                }
            }
            
            if ( editMode ) {
                let result = await this.saveTodo(title, isDone)
                if ( result ) { 

                    this.setState({
                        selectedItem: result,
                        editMode: false,
                        selectedItem: {}
                    })
                    
                } else {
                    this.showInternalError()
                }
            }
        }

    }

    onHandleActionDismiss=() => {
        this.setState({
            addMode: false, 
            editMode: false, 
            selectedItem: {}
        })   
    }

    onHandleAddPress = () => {
        this.setState({
            addMode: true, 
            editMode: false
        })   
    }
    // end add edit callbacks
    
   
    // delete callbacks
    onHandleDeletePress = (item, index) => {
        return () => {
            this.setState({
                selectedItem: item,
                selectedItemIndex: index,
                deleteMode: true
            })
        }
    }

    onHandleDeleteCancel = () => {
        this.setState({
            deleteMode: false, 
            selectedItem: {}
        })
    }

    onHandleDeleteDone = async () => {
        
        const {
            selectedItem,
            selectedItemIndex
        } = this.state

        let isRemoved = await Todo.destroy(selectedItem.id)
        if ( isRemoved ) {
            const { todos } = this.state
            todos.splice(selectedItemIndex, 1)
            this.setState({
                todos, 
                deleteMode: false, 
                selectedItem: {}
            })
        } else {
            this.showInternalError()
        }

    }
    // end delete callbacks

    renderItem = ({item, index}) => {
        return (
            <TodoCard
            title={item.title}
            status={item.isDone}
            onHandleEdit={this.onHandleEditPress(item, index)}
            onHandleDelete={this.onHandleDeletePress(item, index)}/>
        )
    }

    addTodo = async (title, isDone) => {
        const todo = {
            title: title,
            isDone: isDone
        }
        let result = await Todo.create(todo)
        return result
    }

    saveTodo = async (title, isDone) => {

        const { 
            selectedItemIndex,
            todos } = this.state
        
        const itemToEdit = todos[selectedItemIndex]
        itemToEdit.title = title
        itemToEdit.isDone = isDone

        let result = await Todo.update(itemToEdit)
        
        return result

    }
    
    preRender() {
      const {
          todos,
          addMode,
          deleteMode,
          editMode,
          selectedItem,
      } = this.state
       
        return (
            <View style={styles.container}>
            <TodoActionModal 
                visible={addMode || editMode} 
                mode={addMode ? 'add' : 'edit'}
                status={selectedItem.isDone}
                title={selectedItem.title}
                onDismiss={this.onHandleActionDismiss} 
                onDone={this.onHandleActionDone}/>   
            <DeleteWarningModal 
                visible={deleteMode}
                onDismiss={this.onHandleDeleteCancel}
                onDone={this.onHandleDeleteDone}/>  
                <FlatList
                    style={styles.list}
                    data={todos}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id.toString()}
                />
                <FAB
                    style={styles.fab}
                    medium
                    icon="plus"
                    onPress={this.onHandleAddPress}
                />
            </View>
        );
  }
}


const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    list: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 10,
        marginBottom: 10
        
    }
})