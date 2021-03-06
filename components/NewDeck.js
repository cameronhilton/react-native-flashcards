import React, { Component } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import DeckHeader from './DeckHeader'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/helpers'
import { darkBlue, white } from '../utils/colors'

class NewDeck extends Component {
  state = {
    value: '',
  }

  onChangeText = (text) => this.setState({value: text})

  handleOnPress = () => {
    const { dispatch, navigation } = this.props

    saveDeckTitle(this.state.value)
      .then((deck) => {
        dispatch(addDeck(deck))
      })
      .then(() => {
        navigation.dispatch(
          StackActions.replace('Deck', {
            deck: this.state.value,
          })
        )

        this.setState(() => ({value: ''}))
      })
  }

  render() {
    const { value } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <DeckHeader title='Create New Deck'/>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles.center}>
              <TextInput
                  style={styles.textInput}
                  placeholder='New Deck Name'
                  value={value}
                  onChangeText={text => this.onChangeText(text)}
                  maxLength={50}
                />
                <TouchableOpacity
                  style={[
                    Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn,
                    { opacity: value === '' ? 0.5 : 1 }
                  ]}
                  disabled={value === ''}
                  onPress={() => this.handleOnPress()}>
                  <Text style={styles.submitBtnText}>Create Deck</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
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
    height: 40,
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

export default connect()(NewDeck)
