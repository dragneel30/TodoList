
import TodoScreen  from './screens/TodoScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Navigator = createStackNavigator({
  TodoScreen: {
    screen: TodoScreen
  },
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false
  }
}); 



const App = createAppContainer(Navigator);
export default App;
