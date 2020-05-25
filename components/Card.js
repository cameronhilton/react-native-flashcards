import React, { Component } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { darkBlue, gray, white } from '../utils/colors'

export default class Card extends Component {
  state = {
    showQuestion: true,
    flipValue: new Animated.Value(0),
  }

  toggleQuestion = () => {
    this.flipCard()
    this.setState((currentState) => ({
      showQuestion: !currentState.showQuestion,
    }))
  }

  flipCard = () => {
    const { flipValue } = this.state

    if (flipValue._value > Math.PI / 2) {
      Animated.spring(flipValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
      }).start()
    } else {
      Animated.spring(flipValue, {
        toValue: Math.PI,
        tension: 10,
        friction: 8,
      }).start()
    }
  }

  render() {
    const { showAnswerBtn, qAndA } = this.props
    const { flipValue, showQuestion } = this.state

    return (
      <View>
        <TouchableOpacity onPress={() => this.toggleQuestion()}>
          <Animated.View style={[
            styles.card,
            {transform: [
              {rotateY: flipValue},
              {scaleX: showQuestion ? 1 : -1}]
            }]}
          >
            {showQuestion
              ? <Text style={styles.cardText}>{qAndA.question}</Text>
              : <Text style={styles.cardText}>{qAndA.answer}</Text>}
          </Animated.View>
        </TouchableOpacity>
        {showAnswerBtn &&
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={() => this.toggleQuestion()}
          >
            <Text style={styles.submitBtnText}>Show {showQuestion ? 'Answer' : 'Question'}</Text>
          </TouchableOpacity>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    backgroundColor: gray,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 3,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  cardText: {
    fontSize: 16,
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
})
