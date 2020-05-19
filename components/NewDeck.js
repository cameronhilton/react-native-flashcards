import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DeckHeader from './DeckHeader'

export default class NewDeck extends Component {
  render() {
    return (
      <View>
        <DeckHeader title='Create New Deck'/>
        {/* input title, create deck button */}
      </View>
    )
  }
}
