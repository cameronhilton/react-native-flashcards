import 'react-native-gesture-handler'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import NewCard from './components/NewCard'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'
import reducer from './reducers'
import { lightBlue } from './utils/colors'

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const StackNavigatorConfig = {
  headerMode: 'screen',
  defaultNavigationOptions: {
      headerTitleAlign: 'center',
  }
}

const StackConfig = {
  Deck: {
    name: 'Deck',
    component: Deck,
    options: {
      title: 'Deck',
    },
  },
  DeckList: {
    name: 'Home',
    component: DeckList,
    options: {
      title: 'Home'
    },
  },
  NewDeck: {
    component: NewDeck,
    name: 'NewDeck',
    options: {
      title: 'New Deck'
    }
  },
  NewCard: {
    name: 'NewCard',
    component: NewCard,
    options: {
      title: 'Add Card'
    }
  },
  Quiz: {
    name: 'Quiz',
    component: Quiz,
    options: {
      title: 'Quiz'
    }
  },
}

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['DeckList']}/>
    <Stack.Screen {...StackConfig['NewDeck']}/>
    <Stack.Screen {...StackConfig['Deck']}/>
    <Stack.Screen {...StackConfig['NewCard']}/>
    <Stack.Screen {...StackConfig['Quiz']}/>
  </Stack.Navigator>
)

class App extends React.Component {
  store = createStore(reducer)

  render() {
    return (
      <Provider store={this.store}>
        <CardsStatusBar backgroundColor={lightBlue} barStyle='light-content'/>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <MainNav/>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    )
  }

}

export default App
