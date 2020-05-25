import React, { Component } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View } from 'react-native'
import { connect } from 'react-redux'
import Card from './Card'
import FloatBtn from './FloatBtn'
import { purple, red, lightBlue } from '../utils/colors'

class Deck extends Component {
  componentDidMount() {
    const { decks, navigation } = this.props

    navigation.setOptions({ title: decks[this.props.route.params.deck].title })
  }

  render() {
    const { deck } = this.props.route.params
    const { decks, navigation } = this.props
    const deckLength = decks[deck].questions.length
    const lengthText = deckLength === 1 ? 'card' : 'cards'

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.cardCount}>{deckLength} {lengthText}</Text>
        {deckLength === 0
          ? <View style={styles.center}>
              <Text>No cards created yet</Text>
            </View>
          : <ScrollView>
              {decks[deck].questions.map((qAndA) => (
                <Card key={qAndA.question} qAndA={qAndA}/>))}
            </ScrollView>}

        {deckLength > 0 &&
          <FloatBtn
            toComponent={'Quiz'}
            navigation={navigation}
            params={{deck}}
            alignSelf={'center'}
            bgColor={purple}
            iconName='sticky-note-o'
            text='Quiz'
          />}
        <FloatBtn
          toComponent={'NewCard'}
          navigation={navigation}
          params={{deck}}
          bgColor={red}
          iconName='plus'
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  cardCount : {
    padding: 5,
    textAlign: 'center',
    fontSize: 16,
    color: lightBlue,
  }
})

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Deck)
