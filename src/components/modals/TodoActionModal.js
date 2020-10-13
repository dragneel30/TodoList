import * as React from 'react'
import { StyleSheet, View, TextInput} from 'react-native';
import { Portal, Text, Button, Provider, Card } from 'react-native-paper'
import Modal from 'react-native-modal'
import { Switch } from 'react-native-switch';
import { displays } from '../../utils/constants'
const TodoActionModal = (props) => {
  const [title, setTitle] = React.useState('')
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onHandleTextChanged = text => setTitle(text)

  React.useEffect(() => {
    setIsSwitchOn(props.status)
    setTitle(props.title)
  }, [props.status, props.title])

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
                            <Text>{props.mode == 'add' ? displays.add_todo : displays.edit_todo}</Text>
                        </View>
                    </Card.Content>
                </Card>
            {/* end Header */}
            {/* Body */}
            <View style={styles.bodyContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titelLabel}>{displays.title}</Text>
                    <TextInput
                        style={styles.titleInput}
                        placeholder={displays.title_placeholder}
                        value={title}
                        onChangeText={onHandleTextChanged}/>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>{displays.status}</Text>
                    <Switch
                        circleSize={24}
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                        disabled={false}
                        activeText={'Yes'}
                        inActiveText={'No'}
                        backgroundActive={'green'}
                        backgroundInactive={'gray'}
                        circleActiveColor={'green'}
                        circleInActiveColor={'gray'}/>
                </View>
            </View>
            {/* end Body */}
            {/* Action */}
            <View style={styles.actionContainer}>
                <Button 
                    mode="outlined" 
                    color="black" 
                    onPress={props.onDismiss}>
                    {displays.cancel}
                </Button>
                <Button 
                    style={styles.save} 
                    mode="outlined" 
                    color="black" 
                    onPress={props.onDone(title, isSwitchOn)}>
                    {displays.save}
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
        height:300
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
        flex:1,
        borderBottomColor: '#000', 
        borderBottomWidth: 1            
    },
    statusContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    statusLabel: {
        marginRight: 15
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
export default TodoActionModal