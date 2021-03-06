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
import Card from './Card'
import DeckHeader from './DeckHeader'
import FloatBtn from './FloatBtn'
import { darkBlue, pink, purple, red, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    cardIndex: 0,
    correct: 0,
  }

  handleOnPress = (correct) => {
    const newCardIndex = this.state.cardIndex + 1

    this.setState((currentState) => ({
      cardIndex: newCardIndex,
      correct: correct ? currentState.correct + 1 : currentState.correct,
    }))

    // Quiz completed, clear daily notification
    if (newCardIndex >= this.props.decks[this.props.route.params.deck].questions.length) {
      clearLocalNotification()
        .then(setLocalNotification())
    }
  }

  render() {
    const { cardIndex, correct } = this.state
    const { decks, navigation, route } = this.props
    const { deck } = route.params
    const questionCount = decks[deck].questions.length
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
        <DeckHeader title={`${correct} / ${cardIndex}`}/>
        {atEnd
          ? <View style={[styles.grow, {justifyContent: 'center'}]}>
              <Text style={styles.infoText}>
                Score: {Math.round(100 * correct / questionCount)}%
              </Text>
              <FloatBtn
                toComponent={'Deck'}
                navigation={navigation}
                params={{deck: decks[deck].title}}
                alignSelf={'flex-start'}
                bgColor={pink}
                iconName='list'
                text='Deck'
              />
              <FloatBtn
                onPress={() => this.setState({cardIndex: 0, correct: 0})}
                alignSelf={'center'}
                bgColor={purple}
                iconName='question'
                text='Quiz'
              />
            </View>
          : <ScrollView contentContainerStyle={styles.grow}>
              <Card qAndA={decks[deck].questions[cardIndex]} showAnswerBtn={true}/>
              <View style={[styles.center, {flexDirection: 'row'}]}>
              <TouchableOpacity
                  style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, {backgroundColor: red}]}
                  onPress={() => this.handleOnPress(false)}>
                  <Text style={styles.submitBtnText}>Incorrect</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                  onPress={() => this.handleOnPress(true)}>
                  <Text style={styles.submitBtnText}>Correct</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.infoText}>Questions left: {questionCount - cardIndex}</Text>
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
    height: 45,
    width: 130,
    borderRadius: 2,
    marginLeft: 30,
    marginRight: 30,
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
    justifyContent: 'flex-end',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 30,
  },
})

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Quiz)
