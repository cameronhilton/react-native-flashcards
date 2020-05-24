import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import DeckHeader from './DeckHeader'
import FloatBtn from './FloatBtn'
import { getDecks } from '../utils/helpers'
import { receiveDecks } from '../actions'
import { white } from '../utils/colors'

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
    const { decks, navigation } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading/>
    }

    return (
      <SafeAreaView style={styles.container}>
        <DeckHeader title='Decks'/>
        <ScrollView >
          {decks === null
            ? <View>
                <Text>No decks created yet</Text>
              </View>
            : Object.keys(decks).map((deck) => {
                return (
                  <TouchableOpacity
                    key={deck}
                    onPress={() => navigation.navigate(
                      'Deck',
                      { deck: deck },
                    )}
                  >
                    <View style={styles.deck}>
                      <DeckHeader title={decks[deck].title} fontSize={20}/>
                      <View style={styles.center}>
                        <Text style={{fontSize: 18, paddingTop: 5}}>
                          {decks[deck].questions.length} cards
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
        </ScrollView>
        <FloatBtn toComponent={'NewDeck'} navigation={navigation}/>
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
    marginTop: 20,
  },
  deck: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 3,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    color: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
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

export default connect(mapStateToProps)(DeckList)
