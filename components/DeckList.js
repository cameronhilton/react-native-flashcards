import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { AppLoading } from 'expo'
import Deck from './Deck'
import DeckHeader from './DeckHeader'
import { getDecks } from '../utils/helpers'

export default class DeckList extends Component {
  state = {
    decks: null,
    ready: false,
  }

  componentDidMount() {
    getDecks()
      .then((decks) => this.setState({
        decks,
        ready: true,
      }))
  }

  render() {
    const { decks, ready } = this.state

    if (ready === false) {
      return <AppLoading/>
    }

    return (
      <View>
        <DeckHeader title='Deck List'/>
        {decks === null
          ? <View>
              <Text>No decks created yet</Text>
            </View>
          : Object.keys(decks).map((deck) => {
              return (
                <Deck key={deck} deck={decks[deck]}/>
              )
            })}
      </View>
    )
  }
}
