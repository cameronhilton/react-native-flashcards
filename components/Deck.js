import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DeckHeader from './DeckHeader'

export default class Deck extends Component {
  render() {
    return (
      <View>
        <DeckHeader title='Some Deck'/>
        <Text>Deck</Text>
      </View>
    )
  }
}
