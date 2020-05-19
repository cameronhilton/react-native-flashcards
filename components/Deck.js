import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DeckHeader from './DeckHeader'

export default class Deck extends Component {
  render() {
    const { deck } = this.props

    return (
      <View>
        <DeckHeader title={deck.title}/>
      </View>
    )
  }
}
