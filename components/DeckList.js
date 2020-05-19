import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Deck from './Deck'

export default class DeckList extends Component {
  render() {
    return (
      <View>
        <Text>DeckList</Text>
        <Deck/>
      </View>
    )
  }
}
