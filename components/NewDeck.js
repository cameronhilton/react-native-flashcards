import React, { Component } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
    const { dispatch } = this.props

    saveDeckTitle(this.state.value)
      .then((deck) => {
        dispatch(addDeck(deck))
      })
    
    this.setState(() => ({
      value: '',
    }))
  }

  render() {
    const { value } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <DeckHeader title='Create New Deck'/>
        <View style={styles.center}>
          <TextInput
            style={styles.textInput}
            placeholder='New Deck Name'
            value={value}
            onChangeText={text => this.onChangeText(text)}
            maxLength={50}
          />
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            disabled={value === ''}
            onPress={this.handleOnPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    alignSelf: 'flex-end',
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
