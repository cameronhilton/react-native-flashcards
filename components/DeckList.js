import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import Deck from './Deck'
import DeckHeader from './DeckHeader'
import { getDecks } from '../utils/helpers'
import { receiveDecks } from '../actions'

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks))
        
        this.setState({
          ready: true,
        })
      })
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

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

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DeckList)
