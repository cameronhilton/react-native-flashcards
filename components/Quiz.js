import React, { Component } from 'react'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { getDeck } from '../utils/helpers'
import Card from './Card'
import DeckHeader from './DeckHeader'
import { darkBlue, white } from '../utils/colors'

class Quiz extends Component {
  state = {
    cardIndex: 0,
    correct: 0,
    deck: null,
  }

  handleOnPress = (correct) => {
    this.setState((currentState) => ({
      cardIndex: currentState.cardIndex + 1,
      correct: correct ? currentState.correct + 1 : currentState.correct,
    }))

  }

  componentDidMount() {
    getDeck(this.props.route.params.deck)
      .then((deck) => this.setState(() => ({deck,})))
  }

  render() {
    const { cardIndex, correct, deck } = this.state

    if (deck === null) {
      return <AppLoading/>
    }

    const questionCount = deck.questions.length
    const atEnd = cardIndex >= questionCount

    if (questionCount === 0) {
      return (
        <View style={[styles.container, {alignItems: 'center', padding: 20}]}>
          <Text>No cards created yet</Text>
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <DeckHeader title={`Quiz - ${correct} / ${questionCount}`}/>
        {atEnd
          ? <View style={styles.grow}>
              <Text style={styles.noMoreCards}>Score: {Math.round(100 * correct / questionCount)}%</Text>
              <View style={styles.center}>
                <TouchableOpacity
                  style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                  onPress={() => this.setState({cardIndex: 0, correct: 0})}>
                  <Text style={styles.submitBtnText}>Restart Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          : <ScrollView contentContainerStyle={styles.grow}>
              <Card qAndA={deck.questions[cardIndex]}/>
              <View style={[styles.center, {flexDirection: 'row'}]}>
                <TouchableOpacity
                  style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                  onPress={() => this.handleOnPress(true)}>
                  <Text style={styles.submitBtnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                  onPress={() => this.handleOnPress(false)}>
                  <Text style={styles.submitBtnText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>}
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
  iosSubmitBtn: {
    backgroundColor: darkBlue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 60,
    marginRight: 60,
  },
  androidSubmitBtn: {
    backgroundColor: darkBlue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginLeft: 60,
    marginRight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 50,
    paddingBottom: 20,
  },
  grow: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  noMoreCards: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 30,
  },
})

export default connect()(Quiz)
