import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import DeckHeader from './DeckHeader'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/helpers'

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
      <View>
        <DeckHeader title='Create New Deck'/>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder='New Deck Name'
          value={value}
          onChangeText={text => this.onChangeText(text)}
          maxLength={50}
        />
        <TouchableOpacity
          onPress={this.handleOnPress}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(NewDeck)
