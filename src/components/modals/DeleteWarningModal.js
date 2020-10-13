import * as React from 'react'
import { StyleSheet, View, TextInput} from 'react-native';
import { Portal, Text, Button, Provider, Card } from 'react-native-paper'
import Modal from 'react-native-modal'
import { Switch } from 'react-native-switch';
import { displays } from '../../utils/constants'

const DeleteWarningModal = (props) => {

  return (
    <View>
        <Modal 
            isVisible={props.visible} 
            onDismiss={props.onDismiss}>  
            {/* Header */} 
            <View style={styles.container}> 
                <Card style={styles.headerContainer}>
                    <Card.Content style={styles.headerContent}>
                        <View style={styles.title}>
                            <Text>{displays.delete_warning}</Text>
                        </View>
                    </Card.Content>
                </Card>
            {/* end Header */}
            {/* Action */}
            <View style={styles.actionContainer}>
                <Button 
                    mode="outlined" 
                    color="black" 
                    onPress={props.onDismiss}>
                    {displays.no}
                </Button>
                <Button 
                    style={styles.save} 
                    mode="outlined" 
                    color="black" 
                    onPress={props.onDone}>
                    {displays.yes}
                </Button>
            </View>
            {/* end Action */}
            </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal:10, 
        borderRadius:8, 
        backgroundColor: '#ffffff',
        height: 120
    },
    headerContainer: {
        elevation: 2
    },
    headerContent: {
        flexDirection: 'row',
    },
    bodyContainer: {
        marginHorizontal:10
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:50
    },
    titelLabel: {
        marginRight:10
    },
    titleInput: {
        marginHorizontal:10,
        marginTop:10,
        flex:1,
        borderBottomColor: '#000', 
        borderBottomWidth: 1            
    },
    statusContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    statusLabel: {
        marginRight:10
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems:'flex-end', 
        justifyContent: 'flex-end', 
        position:'absolute',
        bottom:0,
        right:0,
        marginRight:10, 
        marginBottom:10
    },
    save: { 
        marginLeft: 10
    }
})
export default DeleteWarningModal