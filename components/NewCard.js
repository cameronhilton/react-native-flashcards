import React, { Component } from 'react'
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import DeckHeader from './DeckHeader'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/helpers'
import { darkBlue, white } from '../utils/colors'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  onChangeText = (field, text) => this.setState({[field]: text})

  handleOnPress = () => {
    const { dispatch, route } = this.props
    const deck = route.params.deck
    const card = {
      question: this.state.question,
      answer: this.state.answer,
    }

    addCardToDeck(deck, card)
      .then(() => {
        dispatch(addCard(deck, card))
      })
      .then(() => {
        this.setState(() => ({
          question: '',
          answer: '',
        }))
      })
  }

  render() {
    const { question, answer } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <DeckHeader title='Create New Card'/>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.center}
        >
          <TextInput
            style={styles.textInput}
            placeholder='Question'
            value={question}
            onChangeText={text => this.onChangeText('question', text)}
            maxLength={250}
            multiline={true}
            blurOnSubmit={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder='Answer'
            value={answer}
            onChangeText={text => this.onChangeText('answer', text)}
            maxLength={250}
            multiline={true}
            blurOnSubmit={true}
          />
          <TouchableOpacity
            style={[
              Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn,
              { opacity: question === '' || answer === '' ? 0.5 : 1 }
            ]}
            disabled={question === '' || answer === ''}
            onPress={() => this.handleOnPress()}>
            <Text style={styles.submitBtnText}>Create Card</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  textInput: {
    height: 120,
    borderColor: darkBlue,
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 7 : 2,
    margin: 20,
    padding: 10,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 10,
    marginRight: 10,
  },
})

export default connect()(NewCard)
