import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Main</Text>
      <Deck/>
      <DeckList/>
      <Quiz/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
