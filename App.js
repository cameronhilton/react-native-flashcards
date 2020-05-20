import 'react-native-gesture-handler'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import reducer from './reducers'
import { lightBlue, red, white } from './utils/colors'

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const RouteConfigs = {
  DeckList: {
    name: 'DeckList',
    component: DeckList,
    options: {
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
      title: 'View Decks'
    }
  }, 
  NewDeck: {
    component: NewDeck,
    name: 'NewDeck',
    options: {
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />,
      title: 'New Deck'
    }
  },
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? lightBlue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : lightBlue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
}

const Tab = Platform.OS === 'ios'
  ? createBottomTabNavigator() 
  : createMaterialTopTabNavigator()

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['DeckList']} />
    <Tab.Screen {...RouteConfigs['NewDeck']} />
  </Tab.Navigator>
)

const StackNavigatorConfig = {
  headerMode: 'screen',
}

const StackConfig = {
  TabNav: {
    name: 'Home',
    component: TabNav,
    options: { headerShown: false },
  }, 
  Deck: {
    name: 'Deck',
    component: Deck,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue,
      },
    },
  }
}

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']}/>
    <Stack.Screen {...StackConfig['Deck']}/>
  </Stack.Navigator>
)

export default function App() {
  const store = createStore(reducer)
  return (
    <Provider store={store}>
      <CardsStatusBar backgroundColor={lightBlue} barStyle='light-content'/>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <MainNav/>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  )
}
