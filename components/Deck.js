import React, { Component } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View } from 'react-native'
import { connect } from 'react-redux'
import Card from './Card'
import DeckHeader from './DeckHeader'

class Deck extends Component {
  componentDidMount() {
    const { decks, navigation } = this.props

    navigation.setOptions({ title: decks[this.props.route.params.deck].title })
  }

  render() {
    const { deck } = this.props.route.params
    const { decks } = this.props
    const deckLength = decks[deck].questions.length
    const lengthText = deckLength === 1 ? 'card' : 'cards'

    return (
      <SafeAreaView style={styles.container}>
        <DeckHeader title={`${decks[deck].title} - ${deckLength} ${lengthText}`}/>
        <ScrollView>
          {decks[deck].questions.length === 0
            ? <View style={[styles.center, {padding: 20}]}>
                <Text>No cards created yet</Text>
              </View>
            : decks[deck].questions.map((qAndA) => {
                return (
                  <Card key={qAndA.question} qAndA={qAndA}/>
                )
              })}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Deck)
